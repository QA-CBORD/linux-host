import { MapsUriPipe } from './maps-uri.pipe';

describe('MapsUriPipe', () => {
  let pipe: MapsUriPipe;
  let nativeProvider: any;
  const address = 'New York, USA';

  beforeEach(() => {
    nativeProvider = {
      isAndroid: jest.fn(),
      isIos: jest.fn(),
    };
    pipe = new MapsUriPipe(nativeProvider);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should set uriScheme to "geo:?q=" when native provider is Android', () => {
    nativeProvider.isAndroid.mockImplementation(() => true);
    pipe = new MapsUriPipe(nativeProvider);
    expect(pipe.uriScheme).toBe('geo:?q=');
    expect(pipe.transform(address)).toBe(parseScheme(pipe.uriScheme, address));
  });

  it('should set uriScheme to "maps://maps.apple.com/?q=" when native provider is iOS', () => {
    nativeProvider.isIos.mockImplementation(() => true);
    pipe = new MapsUriPipe(nativeProvider);
    expect(pipe.uriScheme).toBe('maps://maps.apple.com/?q=');
    expect(pipe.transform(address)).toBe(parseScheme(pipe.uriScheme, address));
  });

  it('should set uriScheme to "https://www.google.com/maps/place/" when native provider is neither Android nor iOS', () => {
    pipe = new MapsUriPipe(nativeProvider);
    expect(pipe.uriScheme).toBe('https://www.google.com/maps/place/');
    const transformedAddress = pipe.transform(address);
    expect(pipe.transform(address)).toBe(parseScheme(pipe.uriScheme, address));
  });
});

const parseScheme = (scheme: string, address: string) => `${scheme}${encodeURIComponent(address)}`;
