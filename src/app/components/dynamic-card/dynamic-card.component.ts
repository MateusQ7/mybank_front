import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-card.component.html',
  styleUrl: './dynamic-card.component.css'
})
export class DynamicCardComponent implements OnInit {
  name$!: Observable<string>
  img$!: Observable<string>

  constructor(private stateService: StateService) { }
  ngOnInit(): void {
    this.name$ = this.stateService.name$;
    this.img$ = this.stateService.img$;

  }



}
