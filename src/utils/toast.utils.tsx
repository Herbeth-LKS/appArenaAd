import {
  CustomButtonToast,
  CustomButtonToastProps,
} from '@/components/Toasts/ButtonToast'
import { ErrorToast } from '@/components/Toasts/ErrorToast'
import { CustomSuccessToast } from '@/components/Toasts/SuccessToast'
import CustomErrorToast from '@/components/CustomErrorToast'
import { ToastProps } from 'react-native-toast-message'

export const toastConfig = {
  success: (props: ToastProps) => <CustomSuccessToast {...props} />,
  error: (props: ToastProps) => <ErrorToast {...props} />,
  customErrorToast: (props: ToastProps) => <CustomErrorToast {...props} />,
  buttonToast: (props: CustomButtonToastProps) => (
    <CustomButtonToast {...props} />
  ),
}
