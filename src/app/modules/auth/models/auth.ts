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

export interface SignUpDto {
  username: string;
  email: string;
  fullname: string;
  password: string;
  companyName: string;
}

export interface SignUpForm extends SignUpDto {
  confirmPassword: string;
}

export interface Token {
  token: string;
}
