import {Injectable, Logger} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {HttpService} from '@nestjs/axios'
import {API_URL, NOT_FOUND_CLUSTER, SALARY_CLUSTER_ID} from './hh.constants'
import {HhResponse} from './hh.models'
import {lastValueFrom} from 'rxjs'
import {HhData} from '../top-page/top-page.model'

@Injectable()
export class HhService {
  token: string

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.token = this.configService.get('HH_TOKEN') ?? ''
  }

  async getData(text: string) {
    try {
      const httpResponse = this.httpService.get<HhResponse>(API_URL.vacancies, {
        params: {
          text,
          cluster: true,
        },
        headers: {
          'User-Agent': 'OwlTop/1.0 (app@example.com)',
          Authorization: 'Bearer ' + this.token,
        },
      })
      const {data} = await lastValueFrom(httpResponse)
    } catch (e) {
      Logger.error(e)
    }
  }

  private parseData(data: HhResponse): HhData {
    const salaryCluster = data.clusters.find(c => c.id == SALARY_CLUSTER_ID)
    if (!salaryCluster) {
      throw new Error(NOT_FOUND_CLUSTER)
    }

    const juniorSalary = 0
    const middleSalary = 0
    const seniorSalary = 0

    return {
      count: data.found,
      juniorSalary,
      middleSalary,
      seniorSalary,
      updatedAt: new Date()
    }
  }
}
