import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() item: any = {};
  @Input() isTournament = false;
  @Input() logo: string = '';

  public gym: any;

  ngOnChanges(changes : SimpleChanges){
    if(changes['item'] && changes['item'].currentValue) {
      if(this.isTournament && this.item.gym) {
        this.gym = this.item.gym;
      } else {
        this.gym = this.item;
      }
    }
  }

}
