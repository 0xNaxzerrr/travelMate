import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Geolocation } from './schemas/geolocation.schema';
import { CreateGeolocationDto } from './dto/create-geolocation.dto';

@Injectable()
export class GeolocationService {
  constructor(
    @InjectModel(Geolocation.name) private geolocationModel: Model<Geolocation>,
    private readonly httpService: HttpService
  ) {}

  async create(createGeolocationDto: CreateGeolocationDto): Promise<Geolocation> {
    const geolocation = new this.geolocationModel(createGeolocationDto);
    return geolocation.save();
  }

  async reverseGeocoding(latitude: number, longitude: number): Promise<any> {
    try {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
      
      const response = await this.httpService.get(url).toPromise();
      const result = response.data.results[0];

      return {
        adresse: result.formatted_address,
        ville: this.extractAddressComponent(result, 'locality'),
        pays: this.extractAddressComponent(result, 'country'),
        codePostal: this.extractAddressComponent(result, 'postal_code')
      };
    } catch (error) {
      console.error('Erreur de géocodage inversé', error);
      return null;
    }
  }

  private extractAddressComponent(result: any, type: string): string {
    const component = result.address_components.find(
      (component: any) => component.types.includes(type)
    );
    return component ? component.long_name : '';
  }

  async geocoding(adresse: string): Promise<any> {
    try {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
      const encodedAdresse = encodeURIComponent(adresse);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdresse}&key=${apiKey}`;
      
      const response = await this.httpService.get(url).toPromise();
      const result = response.data.results[0];

      return {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        adresse: result.formatted_address
      };
    } catch (error) {
      console.error('Erreur de géocodage', error);
      return null;
    }
  }
}