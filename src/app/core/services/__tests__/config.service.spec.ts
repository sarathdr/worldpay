import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { cold } from 'jasmine-marbles';
import { ConfigService } from '../config.service';
import * as authorize from '../../../mock/authorize-config.json';

describe('ConfigService', () => {

  let service: ConfigService;
  let get: jest.Mock;

  beforeEach(() => {
    get = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        ConfigService,
        {
          provide: HttpClient,
          useValue: {
            get
          },
        }
      ]
    });

    service = TestBed.get(ConfigService);

  });

  describe('getPaymentUrls ', () => {

    it('should get the url configs', () => {
      const response$ = cold('-a|', { a: authorize });
      get.mockReturnValue(response$);

      service.getPaymentUrls().then((item) => {
        expect(item).toEqual(authorize);
        expect(service.getAuthorizePaymentUrl()).toMatchSnapshot();
      });
    });

    it('should handle error', () => {
      const response$ = cold('-#', {}, { status: 400 });
      get.mockReturnValue(response$);

      service.getPaymentUrls().catch(errors => {
        expect(errors).toMatchSnapshot();
      });
    });

  });

});
