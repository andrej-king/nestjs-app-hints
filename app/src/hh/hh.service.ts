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
      return this.parseData(data)
    } catch (e) {
      Logger.error(e)
    }
  }

  private parseData(data: HhResponse): HhData {
    const salaryCluster = data.clusters.find(c => c.id == SALARY_CLUSTER_ID)
    if (!salaryCluster) {
      throw new Error(NOT_FOUND_CLUSTER)
    }

    const juniorSalary = this.getSalaryFromString(salaryCluster.items[1].name)
    const middleSalary = this.getSalaryFromString(salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name)
    const seniorSalary = this.getSalaryFromString(salaryCluster.items[salaryCluster.items.length - 1].name)

    return {
      count: data.found,
      juniorSalary,
      middleSalary,
      seniorSalary,
      updatedAt: new Date()
    }
  }

  private getSalaryFromString(s: string): number {
    const numberRegExp = /(\d+)/g
    const res = s.match(numberRegExp)

    if (!res) {
      return 0
    }

    return Number(res[0])
  }
}
