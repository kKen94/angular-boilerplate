export interface LoginDto {
  username: string;
  password: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordForm extends ChangePasswordDto {
  confirmPassword: string;
}

export interface ResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordRecoveryForm {
  username: string;
}
