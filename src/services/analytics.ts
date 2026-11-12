export type AnalyticsEventName = 
  | 'page_view'
  | 'catalog_view'
  | 'filter_apply'
  | 'filter_reset'
  | 'sort_aply'
  | 'search_submit'
  | 'movie_card_click'
  | 'movie_details_view'
  | 'watchlist_add'
  | 'watchlist_remove'
  | 'movie_rate'
  | 'comment_create'
  | 'surprise_me_click';

type JsonPrimitive = string | number | boolean | null;
type JsonArray = JsonValue[];
type JsonObject = { [key: string]: JsonValue };
type JsonValue = JsonPrimitive | JsonObject | JsonArray;

interface AnalyticsEvent {
  event_id: string;
  event_name: AnalyticsEventName;
  event_timestamp: string;
  page_path: string;
  movie_id: number | null;
  properties: Record<string, JsonValue>;
}

class AnalyticsService {
  private queue: AnalyticsEvent[] = [];
  private batchInterval: number = 5000; 
  private timerId: number | null = null;
  private endpoint = '/api/analytics/events/';
  private SESSION_TIMEOUT_MS = 30 * 60 * 1000;

  constructor() {
    this.startBatching();
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flush(true);
      }
    });
  }
private getVisitorId(): string {
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem('visitor_id', visitorId);
    }
    return visitorId;
  }

  private getSessionData() {
    const now = Date.now();
    let sessionId = localStorage.getItem('session_id');
    let startedAt = localStorage.getItem('session_started_at');
    const lastActivity = parseInt(localStorage.getItem('last_activity') || '0', 10);

    if (!sessionId || !startedAt || (now - lastActivity > this.SESSION_TIMEOUT_MS)) {
      sessionId = crypto.randomUUID();
      startedAt = new Date(now).toISOString();
      localStorage.setItem('session_id', sessionId);
      localStorage.setItem('session_started_at', startedAt);
    }

    localStorage.setItem('last_activity', now.toString());

    return {
      session_id: sessionId,
      started_at: startedAt,
      device_type: this.getDeviceType(),
    };
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }


  public track(
    eventName: AnalyticsEventName,
    params?: { movie_id?: number; properties?: Record<string, JsonValue> }
  ) {
    let props = params?.properties || {};

    if (eventName === 'search_submit' && props.query) {
      props = { query_length: String(props.query).length, ...props };
      delete props.query; 
    }

    const event: AnalyticsEvent = {
      event_id: crypto.randomUUID(),
      event_name: eventName,
      event_timestamp: new Date().toISOString(),
      page_path: window.location.pathname,
      movie_id: params?.movie_id || null,
      properties: props,
    };

    this.queue.push(event);

    this.getSessionData(); 

    if (this.queue.length >= 50) {
      this.flush();
    }
  }


  private startBatching() {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = window.setInterval(() => {
      this.flush();
    }, this.batchInterval);
  }

  private flush(isUnloading = false) {
    if (this.queue.length === 0) return;

    const eventsToSend = [...this.queue];
    this.queue = [];

    const payload = {
      visitor_id: this.getVisitorId(),
      session: this.getSessionData(),
      events: eventsToSend,
    };

    const token = localStorage.getItem('token'); 
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`; 
    }

    fetch(this.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      keepalive: isUnloading, 
    }).catch(() => {
    });
  }
}

export const analytics = new AnalyticsService();