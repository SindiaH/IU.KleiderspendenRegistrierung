import { Component } from '@angular/core';
import {RoutingConstants} from '../../core/constants/routing.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  routes = RoutingConstants;
}
