import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  
  private readonly imgSource = new BehaviorSubject<string>('../../../assets/info-icon.svg')
  private readonly nameSource = new BehaviorSubject<string>('Conta')
  private readonly componentSource = new BehaviorSubject<string>('account-details')

  name$ = this.nameSource.asObservable()
  img$ = this.imgSource.asObservable()
  component$ = this.componentSource.asObservable()

  setName(name: string): void {
    this.nameSource.next(name)
  }

  setImg(img: string): void {
    this.imgSource.next(img)
  }

  setComponent(component: string){
    this.componentSource.next(component)
  }


  constructor() { }
}
