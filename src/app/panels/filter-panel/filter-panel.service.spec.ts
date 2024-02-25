import { TestBed } from '@angular/core/testing';

import { FilterPanelService } from './filter-panel.service';

describe('FilterPanelService', () => {
  let service: FilterPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
