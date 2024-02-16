import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/api/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  order: any = {};

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {      
      if (params.id === 0 || params.id === '0') {
        this.order = JSON.parse(localStorage.getItem('orderDraft') || '{}');
      }else {
        this.orderService.getOrder(params.id).subscribe((res: any) => {
          this.order = res;
        });
      }
    });

  }

}
