import {Component, Input} from '@angular/core';
import {SubscriptionDestroyComponent} from '../../../core/subscription-destroy.component';
import {DonationTypeProvider} from '../../../database/providers/donation-type.provider';
import {CrisisAreaProvider} from '../../../database/providers/crisis-area.provider';
import {DonationProvider} from '../../../database/providers/donation.provider';
import {CrisisAreaLocalizedEntity} from '../../../database/entities/crisisArea.localized.entity';
import {DonationTypeLocalizedEntity} from '../../../database/entities/donationType.localized.entity';
import {DonationEntity} from '../../../database/entities/donation.entity';
import {ActivatedRoute} from '@angular/router';
import {ResponseInterface} from '../../../database/interfaces/response.interface';
import {DeliveryType} from '../../../core/enums/delivery-type.enum';

@Component({
  selector: 'app-donation-details',
  templateUrl: './donation-details.component.html',
  styleUrls: ['./donation-details.component.scss']
})
export class DonationDetailsComponent extends SubscriptionDestroyComponent {
  crisisAreas: CrisisAreaLocalizedEntity[] = [];
  donationTypes: DonationTypeLocalizedEntity[] = [];
  donation: DonationEntity | undefined;
  loadingDonationFromDatabase = false;
  deliveryTypes = DeliveryType;

  constructor(private donationTypeProvider: DonationTypeProvider,
              private crisisAreaProvider: CrisisAreaProvider,
              private donationProvider: DonationProvider,
              private route: ActivatedRoute ) {
    super();
    this.setNewSubscription = this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.loadingDonationFromDatabase = true;
        this.donationProvider.getById(params['id']).then((data: ResponseInterface) => {
          this.donation = data.data;
          this.loadDonationAddionalInfos();
        });
      }
    })
    this.setNewSubscription = this.donationTypeProvider.donationTypes.subscribe(donationTypes => {
      this.donationTypes = donationTypes;
      this.loadDonationAddionalInfos();
    });
    this.setNewSubscription = this.crisisAreaProvider.crisisAreas.subscribe(crisisAreas => {
      this.crisisAreas = crisisAreas;
      this.loadDonationAddionalInfos();
    });
    this.setNewSubscription = this.donationProvider.currentlySelectedDonation.subscribe(donation => {
      if (!this.loadingDonationFromDatabase) {
        this.donation = donation;
        this.loadDonationAddionalInfos();

      }
    });
  }

  loadDonationAddionalInfos() {
    if(this.donation) {
      this.donation.donationTypeName = this.donationTypes.find(donationType => donationType.id === this.donation?.donationTypeId)?.name;
      this.donation.crisisAreaName = this.crisisAreas.find(crisisArea => crisisArea.id === this.donation?.crisisAreaId)?.name;
    }
  }

  protected readonly DeliveryType = DeliveryType;
}
