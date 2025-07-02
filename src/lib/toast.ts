import { toast } from '@/hooks/use-toast'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'danger'

class ToastService {
  show(message: string, type: ToastType = 'info', title?: string) {
    const variant = this.mapTypeToVariant(type)
    
    toast({
      title: title || this.getDefaultTitle(type),
      description: message,
      variant,
    })
  }

  success(message: string, title?: string) {
    this.show(message, 'success', title)
  }

  error(message: string, title?: string) {
    this.show(message, 'error', title)
  }

  warning(message: string, title?: string) {
    this.show(message, 'warning', title)
  }

  info(message: string, title?: string) {
    this.show(message, 'info', title)
  }

  danger(message: string, title?: string) {
    this.show(message, 'danger', title)
  }

  private mapTypeToVariant(type: ToastType): 'default' | 'destructive' {
    switch (type) {
      case 'error':
      case 'danger':
        return 'destructive'
      default:
        return 'default'
    }
  }

  private getDefaultTitle(type: ToastType): string {
    switch (type) {
      case 'success':
        return 'Success'
      case 'error':
      case 'danger':
        return 'Error'
      case 'warning':
        return 'Warning'
      case 'info':
        return 'Info'
      default:
        return ''
    }
  }
}

const toastService = new ToastService()
export default toastService