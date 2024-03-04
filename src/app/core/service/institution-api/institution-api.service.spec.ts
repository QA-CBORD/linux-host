import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InstitutionApiService } from './institution-api.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, of } from 'rxjs';

describe('InstitutionApiService', () => {
  let service: InstitutionApiService;
  let serviceUrl = '/json/institution';

  const _httpClient = {
    post: jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InstitutionApiService, { provide: HttpClient, useValue: _httpClient }],
    });
    service = TestBed.inject(InstitutionApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getInstitutionData', () => {
    it('makes getInstitutionData calls', async () => {
      const response = { response: {} };
      _httpClient.post.mockReturnValueOnce(of({ response }));
      const result = await firstValueFrom(service.getInstitutionData());
      expect(_httpClient.post).toHaveBeenCalledWith(serviceUrl, expect.objectContaining({ method: 'retrieve' }));
      expect(result).toMatchObject(response.response);
    });
  });
  it('makes getInstitutionDataById calls', async () => {
    const response = { response: {} };
    _httpClient.post.mockReturnValueOnce(of({ response }));
    const result = await firstValueFrom(service.getInstitutionDataById('test', 'test', true));
    expect(_httpClient.post).toHaveBeenCalledWith(serviceUrl, expect.objectContaining({ method: 'retrieve' }));
    expect(result).toMatchObject(response.response);
  });
  it('makes getInstitutionPhotoById calls', async () => {
    const response = { response: {} };
    _httpClient.post.mockReturnValueOnce(of({ response }));
    const result = await firstValueFrom(service.getInstitutionPhotoById('test', 'test', true));
    expect(_httpClient.post).toHaveBeenCalledWith(serviceUrl, expect.objectContaining({ method: 'retrieve' }));
    expect(result).toMatchObject(response.response);
  });
  it('makes getInstitutionDataByShortName calls', async () => {
    const response = { response: {} };
    _httpClient.post.mockReturnValueOnce(of({ response }));
    const result = await firstValueFrom(service.getInstitutionDataByShortName('test', 'test', true));
    expect(_httpClient.post).toHaveBeenCalledWith(serviceUrl, expect.objectContaining({ method: 'retrieve' }));
    expect(result).toMatchObject(response.response);
  });
  it('makes retrieveLookupList calls', async () => {
    const response = { response: { institutions: [] } };
    _httpClient.post.mockReturnValueOnce(of(response));
    const result = await firstValueFrom(service.retrieveLookupList('test'));
    expect(_httpClient.post).toHaveBeenCalledWith(
      serviceUrl,
      expect.objectContaining({ method: 'retrieveLookupList' })
    );
    expect(result).toMatchObject([]);
  });
  it('makes retrieveAnonymousDepositFields calls', async () => {
    const response = { response: { institutions: [] } };
    _httpClient.post.mockReturnValueOnce(of(response));
    const result = await firstValueFrom(service.retrieveAnonymousDepositFields('test', 'test'));
    expect(_httpClient.post).toHaveBeenCalledWith(
      serviceUrl,
      expect.objectContaining({ method: 'retrieveLookupList' })
    );
    expect(result).toMatchObject(response.response);
  });
});
