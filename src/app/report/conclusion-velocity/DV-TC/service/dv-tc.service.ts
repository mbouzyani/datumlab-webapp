import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DvTcService {
  dataFromServer:any={
    immo: [5484, 5488, 1569, 3248, 1218, 2158, 4795, 2574],
    conso: [2518, 2158, 4795, 2574, 5484, 5488, 1569, 3248],
    auto: [1569, 3248, 4795, 2574, 5484, 5488, 3218, 2158],
    habitat: [4484, 3488, 1569, 4248, 3218, 2158, 5795, 1574]
  };
  constructor() { }

  getData(setting){
    return this.dataFromServer;
  }

}
