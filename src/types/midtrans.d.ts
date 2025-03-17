
interface SnapResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  finish_redirect_url?: string;
  [key: string]: any;
}

interface SnapCallbacks {
  onSuccess: (result: SnapResult) => void;
  onPending: (result: SnapResult) => void;
  onError: (result: SnapResult) => void;
  onClose: () => void;
}

interface SnapInterface {
  pay: (token: string, options: SnapCallbacks) => void;
  show: () => void;
  hide: () => void;
  [key: string]: any;
}

declare global {
  interface Window {
    snap?: SnapInterface;
  }
}

export {};
