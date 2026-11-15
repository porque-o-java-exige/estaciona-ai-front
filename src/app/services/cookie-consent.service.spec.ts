import { TestBed } from '@angular/core/testing';
import { CookieConsentService } from './cookie-consent.service';

describe('CookieConsentService', () => {
  let service: CookieConsentService;

  beforeEach(() => {
    document.cookie = 'estaciona_ai_cookie_consent=; Max-Age=0; Path=/';
    TestBed.configureTestingModule({ providers: [CookieConsentService] });
    service = TestBed.inject(CookieConsentService);
  });

  afterEach(() => {
    document.cookie = 'estaciona_ai_cookie_consent=; Max-Age=0; Path=/';
  });

  it('should show the consent prompt until a choice is saved', () => {
    expect(service.preferences()).toBeNull();
    expect(service.visible()).toBe(true);
  });

  it('should persist the required-only choice when optional cookies are rejected', () => {
    service.rejectOptional();

    expect(service.preferences()).toEqual({ necessary: true, analytics: false });
    expect(service.visible()).toBe(false);
    expect(document.cookie).toContain('estaciona_ai_cookie_consent=');
  });

  it('should persist optional-cookie consent when accepted', () => {
    service.acceptAll();

    expect(service.preferences()).toEqual({ necessary: true, analytics: true });
  });

  it('should restore the saved choice from the consent cookie', () => {
    service.acceptAll();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [CookieConsentService] });
    service = TestBed.inject(CookieConsentService);

    expect(service.preferences()).toEqual({ necessary: true, analytics: true });
    expect(service.visible()).toBe(false);
  });

  it('should allow the visitor to reopen and save preferences', () => {
    service.rejectOptional();
    service.openSettings();
    service.setAnalyticsChoice(true);
    service.saveChoice();

    expect(service.preferences()).toEqual({ necessary: true, analytics: true });
    expect(service.visible()).toBe(false);
  });
});
