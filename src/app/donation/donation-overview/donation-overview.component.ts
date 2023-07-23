import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {SubscriptionDestroyComponent} from '../../core/subscription-destroy.component';
import {DonationProvider} from '../../database/providers/donation.provider';
import {DonationEntity} from '../../database/entities/donation.entity';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {CrisisAreaProvider} from '../../database/providers/crisis-area.provider';
import {CrisisAreaLocalizedEntity} from '../../database/entities/crisisArea.localized.entity';
import {DonationTypeLocalizedEntity} from '../../database/entities/donationType.localized.entity';
import {DonationTypeProvider} from '../../database/providers/donation-type.provider';
import {Router} from '@angular/router';
import {RoutingConstants} from '../../core/constants/routing.constants';

@Component({
  selector: 'app-donation-overview',
  templateUrl: './donation-overview.component.html',
  styleUrls: ['./donation-overview.component.scss']
})
export class DonationOverviewComponent extends SubscriptionDestroyComponent {
  @ViewChild('paginator') paginator: MatPaginator | undefined;
  donations: DonationEntity[] = [];
  sortedData: DonationEntity[] = [];
  crisisAreas : CrisisAreaLocalizedEntity[] = [];
  donationTypes : DonationTypeLocalizedEntity[] = [];
  intialPageSize = 5;
  currentSort: Sort = {active: 'createdAt', direction: 'asc'};
  displayedColumns: string[] = ['deliveryType', 'email', 'createdAt', 'crisisAreaId', 'donationTypeId', 'pickupDate', 'actions'];

  constructor(public donationProvider: DonationProvider,
              private crisisAreaProvider: CrisisAreaProvider,
              private donationTypeProvider: DonationTypeProvider,
              private router: Router) {
    super();
    this.setNewSubscription = this.donationProvider.donations.subscribe(donations => {
      this.donations = donations;
      this.sortData(this.currentSort);
    })
    this.setNewSubscription = this.crisisAreaProvider.crisisAreas.subscribe(crisisAreas => {
      this.crisisAreas = crisisAreas;
    });
    this.setNewSubscription = this.donationTypeProvider.donationTypes.subscribe(donationTypes => {
      this.donationTypes = donationTypes;
    });
  }


  sortData(sort: Sort) {
    this.currentSort = sort;
    const data = this.donations.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    let start = 0;
    let end = this.intialPageSize;
    if(this.paginator) {
      start = this.paginator?.pageIndex * this.paginator?.pageSize;
      end = (this.paginator?.pageIndex + 1) * this.paginator?.pageSize;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'deliveryType':
          return this.compare(a.deliveryType, b.deliveryType, isAsc);
        case 'email':
          return this.compare(a.email, b.email, isAsc);
        case 'createdAt':
          return this.compareDates(a.createdAt, b.createdAt, isAsc);
        case 'crisisAreaId':
          return this.compareCrisisAreas(a.crisisAreaId, b.crisisAreaId, isAsc);
        case 'donationTypeId':
          return this.compareDonationTypes(a.donationTypeId, b.donationTypeId, isAsc);
        case 'pickupDate':
          return this.compareDates(a.pickupDate, b.pickupDate, isAsc);
        default:
          return 0;
      }
    }).slice(start, end);
  }

  changePanginator() {
    this.sortData(this.currentSort);
  }

  compareCrisisAreas(a: string, b: string, isAsc: boolean) {
    let crisisAreaA = this.crisisAreas.find(x => x.id === a);
    let crisisAreaB = this.crisisAreas.find(x => x.id === b);
    return ((crisisAreaA?.name ?? '') < (crisisAreaB?.name ?? '') ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareDonationTypes(a: string, b: string, isAsc: boolean) {
    let donationTypeA = this.donationTypes.find(x => x.id === a);
    let donationTypeB = this.donationTypes.find(x => x.id === b);
    return ((donationTypeA?.name ?? '') < (donationTypeB?.name ?? '') ? -1 : 1) * (isAsc ? 1 : -1);
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  compareDates(a: Date | undefined, b: Date | undefined, isAsc: boolean) {
    if(a === undefined || b === undefined) return 0;
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  editDonation(row: DonationEntity) {
    this.router.navigate([RoutingConstants.DONATION.BASE + '/' + RoutingConstants.DONATION.DETAIL], {queryParams: {id: row.id}});
  }
}
