import { Component } from '@angular/core';
import {RoutingConstants} from '../../core/constants/routing.constants';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {
routes = RoutingConstants;
}
