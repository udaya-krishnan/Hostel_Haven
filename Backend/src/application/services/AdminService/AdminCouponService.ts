import { CouponData } from '../../../domain/entities/Coupon';
import {AdminCouponCase} from '../../../domain/usecase/Admin/AdminCouponCase'
import { AdminRepository } from "../../interfaces/Admin/AdminRepository";


export class AdminCouponService implements AdminCouponCase{
  constructor(private adminRepository:AdminRepository){}

  async addcoupon(data: CouponData): Promise<any | null> {
      const response=await this.adminRepository.addcoupon(data)
      return response
  }

  async fetchcoupon(): Promise<any | null> {
      const response=await this.adminRepository.fetchcoupon()
      return response
  }

  async actioncoupon(id: string): Promise<any | null> {
      const response=await this.adminRepository.actioncoupon(id)
      return response
  }

  async editCoupon(id: string, data: any): Promise<any | null> {
      const response =await this.adminRepository.editCoupon(id,data)
      return response
  }
  
}

