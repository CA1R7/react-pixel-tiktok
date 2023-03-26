/**
 * React Tiktok Pixel Handler
 *
 * @package react-tiktok-taboola
 * @author CA1R7 <cairbyte71@icloud.com>
 */

declare global {
  interface Window {
    TiktokAnalyticsObject: string;
    [key: string]: any;
  }
}

export interface TiktokPixelTracking<L = null> {
  tracking: string;
  instance?: string;
  data?: L;
}

export interface TiktokPixelTTQHandler<O = any, Z = null> {
  methods: string[];
  setAndDefer: (t: any, e: string | number) => void;
  instance: (t: string | number) => any[];
  load: (e: string, n?: {}) => void;
  _i: any;
  _u: string;
  _t: any;
  _o: any;
  track: (tracking: string, data?: O) => void;
  page: () => void;
  identify: (id: string, data?: O) => void;
  instances: () => any[];
  debug: (debug: boolean) => void;
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
  once: (event: string, callback: () => void) => void;
  ready: (callback: () => void) => void;
  alias: (alias: string, original: string) => void;
  group: (groupId: string, traits?: Z) => void;
  enableCookie: () => void;
  disableCookie: () => void;
  [key: string]: any;
}

export class TiktokPixelHandler {
  public cliendId: string | null;
  public pixel_path: string;
  constructor() {
    this.cliendId = null;
    this.pixel_path = "ttq";
  }

  public setClientId(clientId: string): void {
    clientId && (this.cliendId = clientId);
  }

  public setPixelTag(path: string): void {
    path && (this.pixel_path = path);
  }

  public getTracker(): TiktokPixelTTQHandler {
    return (
      ((this.pixel_path in window && window[this.pixel_path]) ?? null) || []
    );
  }

  public init(id?: string): void {
    if (id) {
      this.cliendId = id;
    }

    if (!this.cliendId) {
      throw new Error("Tiktok Pixel Client Id is not defined");
    }

    window.TiktokAnalyticsObject = this.pixel_path;

    let ttq = this.getTracker();

    if (Array.isArray(ttq) && ttq.length) {
      console.warn(
        "Tiktok Pixel is already initialized. Please check your code."
      );
    }

    ttq.methods = [
      "page",
      "track",
      "identify",
      "instances",
      "debug",
      "on",
      "off",
      "once",
      "ready",
      "alias",
      "group",
      "enableCookie",
      "disableCookie",
    ];

    ttq.setAndDefer = function (t: TiktokPixelTTQHandler, e: string | number) {
      t[e] = function () {
        t.push([e].concat(Array.prototype.slice.call(arguments, 0x0)));
      };
    };

    for (let i = 0x0; i < ttq.methods.length; i++)
      ttq.setAndDefer(ttq, ttq.methods[i]);
    (ttq.instance = function (t: string | number) {
      for (var e = ttq._i[t] || [], n = 0x0; n < ttq.methods.length; n++)
        ttq.setAndDefer(e, ttq.methods[n]);
      return e;
    }),
      (ttq.load = function (e: string, n?: {}) {
        let i = "https://analytics.tiktok.com/i18n/pixel/events.js";
        (ttq._i = ttq._i || {}),
          (ttq._i[e] = []),
          (ttq._i[e]._u = i),
          (ttq._t = ttq._t || {}),
          (ttq._t[e] = +new Date()),
          (ttq._o = ttq._o || {}),
          (ttq._o[e] = n || {});
        let o = document.createElement("script");
        (o.type = "text/javascript"),
          (o.async = !0x0),
          (o.src = i + "?sdkid=" + e + "&lib=" + this.pixel_path);
        let a = document.getElementsByTagName("script")[0x0];
        a.parentNode && a.parentNode.insertBefore(o, a);
      });
    ttq.load(this.cliendId);
    ttq.page();
  }

  public setPageView(_instance?: string): boolean {
    if (!this.cliendId) {
      throw new Error("Tiktok Pixel Client Id is not defined");
    }

    let tagN = this.pixel_path;

    if (!window[tagN]) {
      throw new Error("Tiktok Pixel is not initialized");
    }

    let instance = _instance ? window[tagN].instance(_instance) : window[tagN];

    instance.page();

    return true;
  }

  public setTracking<K = null>(props: TiktokPixelTracking<K>): boolean {
    if (!this.cliendId) {
      throw new Error("Tiktok Pixel Client Id is not defined");
    }

    let tagN = this.pixel_path;

    if (!window[tagN]) {
      throw new Error("Tiktok Pixel is not initialized");
    }

    if (!props.tracking) {
      throw new Error("Tiktok Pixel Tracking is not defined");
    }

    let instance = props.instance
      ? window[tagN].instance(props.instance)
      : window[tagN];

    instance.track(props.tracking, props?.data ?? null);

    return true;
  }
}
