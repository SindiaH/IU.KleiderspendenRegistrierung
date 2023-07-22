import {Component, OnInit} from '@angular/core';
import {SubscriptionDestroyComponent} from '../../core/subscription-destroy.component';
import {DonationTypeProvider} from '../../database/providers/donation-type.provider';
import {CrisisAreaProvider} from '../../database/providers/crisis-area.provider';
import {CrisisAreaLocalizedEntity} from '../../database/entities/crisisArea.localized.entity';
import {DonationTypeLocalizedEntity} from '../../database/entities/donationType.localized.entity';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DeliveryType} from '../../core/enums/delivery-type.enum';
import {DonationEntity} from '../../database/entities/donation.entity';
import {AddressEntity} from '../../database/entities/address.entity';
import {Guid} from 'guid-typescript';
import {DonationProvider} from '../../database/providers/donation.provider';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent extends SubscriptionDestroyComponent implements OnInit {
  crisisAreas: CrisisAreaLocalizedEntity[] = [];
  donationTypes: DonationTypeLocalizedEntity[] = [];
  donationForm: FormGroup = new FormGroup({});
  deliveryTypes = DeliveryType;
  loading = false;
  successfullySubmitted = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  donationTypeId = new FormControl('', [Validators.required]);
  crisisAreaId = new FormControl('', [Validators.required]);
  pickupDate = new FormControl(new Date(), [Validators.required]);
  deliveryType = new FormControl(0, [Validators.required]);

  street = new FormControl('', [Validators.required]);
  houseNumber = new FormControl('', [Validators.required]);
  postal = new FormControl('', [Validators.required]);
  location = new FormControl('', [Validators.required]);
  country = new FormControl('Austria', [Validators.required]);


  constructor(private donationTypeProvider: DonationTypeProvider,
              private crisisAreaProvider: CrisisAreaProvider,
              private donationProvider: DonationProvider,
              private formBuilder: FormBuilder) {
    super();
    this.setNewSubscription = this.donationTypeProvider.donationTypes.subscribe(donationTypes => {
      this.donationTypes = donationTypes;
    });
    this.setNewSubscription = this.crisisAreaProvider.crisisAreas.subscribe(crisisAreas => {
      console.log(crisisAreas);
      this.crisisAreas = crisisAreas;
    });


    this.donationForm = this.formBuilder.group({
      email: this.email,
      donationTypeId: this.donationTypeId,
      crisisAreaId: this.crisisAreaId,
      pickupDate: this.pickupDate,
      deliveryType: this.deliveryType,
      street: this.street,
      houseNumber: this.houseNumber,
      postal: this.postal,
      location: this.location,
      country: this.country,
    })
  }

  onSubmit() {
    console.log(this.donationForm);
    if (this.donationForm.valid) {
      let donation = new DonationEntity();
      donation.id = Guid.create().toString();
      donation.email = this.email.value ?? '';
      donation.donationTypeId = this.donationTypeId.value ?? '';
      donation.crisisAreaId = this.crisisAreaId.value ?? '';
      donation.pickupDate = this.pickupDate.value ?? new Date();
      donation.deliveryType = this.deliveryType.value ?? 0;
      let address = new AddressEntity();
      if(donation.deliveryType === DeliveryType.PICKUP) {
        address.street = this.street.value ?? '';
        address.houseNumber = this.houseNumber.value ?? '';
        address.postal = this.postal.value ?? '';
        address.location = this.location.value ?? '';
        address.country = this.country.value ?? '';
      }
      this.loading = true;
      this.donationProvider.add(donation, address).then(() => {
        this.loading = false;
        this.successfullySubmitted = true;

      }, () => {
        this.loading = false;
      });
    }
  }

  getErrorMessage(type: string): string {
    switch (type) {
      case 'email':
        if (this.email.hasError('required')) {
          return 'ERROR.NOT_EMPTY';
        }
        return this.email.hasError('email') ? 'ERROR.INVALID_EMAIL' : '';
      case 'required':
        return 'ERROR.NOT_EMPTY';
      default:
        return '';
    }
  }

  deliveryTypeChanged() {
    if(this.deliveryType.value === DeliveryType.PICKUP) {
      this.street.setValidators([Validators.required]);
      this.houseNumber.setValidators([Validators.required]);
      this.postal.setValidators([Validators.required]);
      this.location.setValidators([Validators.required]);
      this.country.setValidators([Validators.required]);
    } else {
      this.street.setValidators([]);
      this.houseNumber.setValidators([]);
      this.postal.setValidators([]);
      this.location.setValidators([]);
      this.country.setValidators([]);
    }
    this.street.updateValueAndValidity();
    this.houseNumber.updateValueAndValidity();
    this.postal.updateValueAndValidity();
    this.location.updateValueAndValidity();
    this.country.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.email.setValue(this.donationProvider.session?.user?.email ?? '');
  }
}
