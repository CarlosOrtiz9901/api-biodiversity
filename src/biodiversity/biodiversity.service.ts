import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { taxonomy } from 'src/entities/taxonomy';
import { Repository } from 'typeorm';
import { KingdomType, KingdomTypeUrl } from './kingdom.enum'
const puppeteer = require('puppeteer');

@Injectable()
export class BiodiversityService {
  constructor(@InjectRepository(taxonomy) private readonly taxonomyRepository: Repository<taxonomy>
  ) { }

  async update(size: number) {
    const items = await this.taxonomyRepository.find({
      order: {
        id: "ASC"
      }
    })

    let url: string = KingdomTypeUrl.default, k = 0, textContent = {}
    let browser = await puppeteer.launch({ headless: true, args: ["--disable-notifications"] })
    let page = await browser.newPage();

    for (const value of items) {
      let { imagen, id } = await this.taxonomyRepository.findOne({ where: { id: value.id } })

      if (imagen.includes('http')) {
        if (!(imagen.includes('https://static.inaturalist.org/photos/') || imagen.includes('https://inaturalist-open-data.s3.amazonaws.com/photos/')))
          try {
            await page.goto(imagen, { waitUntil: 'networkidle2' });
            await page.setDefaultNavigationTimeout(150000);
            //let query = "#ObservationShow > div.upper > div > div:nth-child(2) > div > div > div > div.photos_column.null.col-xs-7 > div > div > div > div.image-gallery-slide-wrapper.bottom > div > div > div.image-gallery-slide.center > div > img";
            //let query2 = '.image-gallery-image > img';
            await page.waitForTimeout(1000)
            const urlTransformada = await page.$eval(("div[class='image-gallery-image'] > img[src]"), node => node.src);
            console.log(`id=${id}:`, await urlTransformada)

            await this.taxonomyRepository.update(id, { imagen: urlTransformada })
            await page.waitForTimeout(1000)

          } catch (error) {
            await page.close();
            await browser.close();
            throw new BadRequestException({
              error: 'URL_NOT_UPDATED',
              detail: 'Los contenedores response y replay se encuentran vacios.'
            });
          }
      }
      else {
        switch (value.reino) {
          case KingdomType.Animalia:
            url = KingdomTypeUrl.Animalia
            break
          case KingdomType.Chromista:
            url = KingdomTypeUrl.Chromista
            break
          case KingdomType.Fungi:
            url = KingdomTypeUrl.Fungi
            break
          case KingdomType.Plantae:
            url = KingdomTypeUrl.Plantae
            break
          case KingdomType.Protozoa:
            url = KingdomTypeUrl.Protozoa
            break
          default:
            url = KingdomTypeUrl.default
            break
        }
        console.log(`❌ ${id} Url:`, url)
        await this.taxonomyRepository.update(id, { imagen: url })
      }
      k++
    }
    await page.close();
    await browser.close();

  }
}
