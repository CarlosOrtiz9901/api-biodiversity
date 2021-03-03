import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { taxonomy } from '../entities/taxonomy';
import { Repository } from 'typeorm';
import { KingdomType, KingdomTypeUrl } from './kingdom.enum'
const puppeteer = require('puppeteer');
@Injectable()
export class BiodiversityService {
  constructor(@InjectRepository(taxonomy) private readonly taxonomyRepository: Repository<taxonomy>,
  ) { }

  async update() {
    let url = KingdomTypeUrl.default
    let browser, page
    const items = await this.taxonomyRepository.find({
      order: {
        id: "ASC"
      }
    })

    try {
      for (const value of items) {
        let { imagen, id } = await this.taxonomyRepository.findOne({ where: { id: value.id } })

        if (imagen.includes('http')) {
          if (!(imagen.includes('https://static.inaturalist.org/photos/') || imagen.includes('https://inaturalist-open-data.s3.amazonaws.com/photos/')))
            if (!imagen.includes('http://creativesafari.com'))
              if (!imagen.includes('https://upload.wikimedia.org'))
                if (imagen.includes('https://data.biodiversitydata.nl/xeno-canto/observation/'))
                  await this.taxonomyRepository.update(id, { imagen })
                else if (imagen == KingdomTypeUrl.Animalia)
                  await this.taxonomyRepository.update(id, { imagen })
                else if (imagen == KingdomTypeUrl.Chromista)
                  await this.taxonomyRepository.update(id, { imagen })
                else if (imagen == KingdomTypeUrl.Fungi)
                  await this.taxonomyRepository.update(id, { imagen })
                else if (imagen == KingdomTypeUrl.Plantae)
                  await this.taxonomyRepository.update(id, { imagen })
                else if (imagen == KingdomTypeUrl.Protozoa)
                  await this.taxonomyRepository.update(id, { imagen })
                else if (imagen == KingdomTypeUrl.default)
                  await this.taxonomyRepository.update(id, { imagen })
                else {
                  browser = await puppeteer.launch({ headless: false, args: ["--disable-notifications"] })
                  page = await browser.newPage();

                  await page.goto(imagen, { waitUntil: 'networkidle2' });
                  await page.setDefaultNavigationTimeout(30000);

                  await page.waitForTimeout(1000)
                  let urlTransformada = await page.$eval(("div[class='image-gallery-image'] > img[src]"), node => node.src);
                  if (!urlTransformada)
                    urlTransformada = KingdomTypeUrl.Animalia

                  console.log(`id=${id}:`, await urlTransformada)
                  await this.taxonomyRepository.update(id, { imagen: urlTransformada || imagen })
                  await page.waitForTimeout(1000)

                  await page.close();
                  await browser.close();
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
      return { success: 'OK' }
    } catch (error) {
      await page.close();
      await browser.close();
      console.log('error', error)
      return { error }
    }
  }
}
