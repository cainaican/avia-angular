import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface IFilterModel {
  allTransfers: boolean;
  withoutStops: boolean;
  oneStop: boolean;
  twoStops: boolean;
  threeStops: boolean;
}

@Injectable()
export class FilterPanelService {

  public model: IFilterModel = {
    allTransfers: false,
    withoutStops: true,
    oneStop: false,
    twoStops: false,
    threeStops: false
  }

  public potok$: Subject<IFilterModel> = new Subject();

}
