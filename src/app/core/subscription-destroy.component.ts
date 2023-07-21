import {Subscription} from 'rxjs';
import {Component, OnDestroy} from '@angular/core';

@Component({
  template: ''
})
export class SubscriptionDestroyComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected resetSubscriptions() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addSubscription(sub: Subscription) {
    this.subscription.add(sub);
  }

  removeSubscription(sub: Subscription) {
    this.subscription.remove(sub);
  }

  set setNewSubscription(sub: Subscription) {
    this.subscription.add(sub);
  }
}
