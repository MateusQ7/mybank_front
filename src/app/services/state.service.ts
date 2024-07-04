import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  private imgSource = new BehaviorSubject<string>('../../../assets/info-icon.svg')
  private nameSource = new BehaviorSubject<string>('Conta')

  name$ = this.nameSource.asObservable()
  img$ = this.imgSource.asObservable()

  setName(name: string): void {
    this.nameSource.next(name)
  }

  setImg(img: string): void {
    this.imgSource.next(img)
  }


  constructor() { }
}
