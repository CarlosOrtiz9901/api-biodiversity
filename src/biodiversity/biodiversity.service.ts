import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { taxonomy } from 'src/entities/taxonomy';
import { Repository } from 'typeorm';
import { KingdomType, KingdomTypeUrl } from './kingdom.enum'
const puppeteer = require('puppeteer');

@Injectable()
export class BiodiversityService {
  constructor(@InjectRepository(taxonomy) private readonly taxonomyRepository: Repository<taxonomy>,
  ) { }

  async update() {
    let url = KingdomTypeUrl.default
    let browser = await puppeteer.launch({ headless: true, args: ["--disable-notifications"] })
    let page = await browser.newPage();

    const items = await this.taxonomyRepository.find({
      order: {
        id: "ASC"
      }
    })

    for (const value of items) {
      let { imagen, id } = await this.taxonomyRepository.findOne({ where: { id: value.id } })

      if (imagen.includes('http')) {
        if (!(imagen.includes('https://static.inaturalist.org/photos/') || imagen.includes('https://inaturalist-open-data.s3.amazonaws.com/photos/')))
          if (!imagen.includes('http://creativesafari.com'))
            try {
              await page.goto(imagen, { waitUntil: 'networkidle2' });
              await page.setDefaultNavigationTimeout(10000);

              let urlTransformada = await page.$eval(("div[class='image-gallery-image'] > img[src]"), node => node.src);
              if (!urlTransformada)
                urlTransformada = KingdomTypeUrl.Animalia

              console.log(`id=${id}:`, await urlTransformada)

              await this.taxonomyRepository.update(id, { imagen: urlTransformada || imagen })
              await page.waitForTimeout(1000)

            } catch (error) {
              await page.close();
              await browser.close();
              throw new BadRequestException({
                error: 'URL_NOT_UPDATED',
                detail: 'Los contenedores response y replay se encuentran vacios.'
              });
            }

      } else {
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
    }
    await page.close();
    await browser.close();
  }

}
