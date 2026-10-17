<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'phone' => [
                'required',
                'string',
                'regex:/^0[35789][0-9]{8}$/',
                'unique:users,phone',
            ],
            'full_name' => [
                'required',
                'string',
                'max:100',
            ],
            'password' => [
                'required',
                'string',
                'min:8',
            ],
            'email' => [
                'nullable',
                'email',
                'max:150',
                'unique:users,email',
            ],
            'role' => [
                'required',
                Rule::in(['FARMER', 'BUYER']),
            ],
            'account_type' => [
                Rule::requiredIf(fn () => $this->input('role') === 'FARMER'),
                'nullable',
                Rule::in(['INDIVIDUAL', 'COOPERATIVE']),
            ],
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'phone.required' => 'Số điện thoại là bắt buộc.',
            'phone.regex' => 'Số điện thoại không đúng định dạng di động Việt Nam (10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09).',
            'phone.unique' => 'Số điện thoại này đã được đăng ký trên hệ thống.',
            'full_name.required' => 'Họ và tên là bắt buộc.',
            'full_name.max' => 'Họ và tên không được vượt quá 100 ký tự.',
            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
            'email.email' => 'Email không đúng định dạng.',
            'email.max' => 'Email không được vượt quá 150 ký tự.',
            'email.unique' => 'Email này đã được sử dụng.',
            'role.required' => 'Vai trò là bắt buộc.',
            'role.in' => 'Vai trò không hợp lệ. Chỉ chấp nhận FARMER hoặc BUYER.',
            'account_type.required_if' => 'Loại tài khoản (Cá nhân hoặc Hợp tác xã) là bắt buộc đối với Nông dân.',
            'account_type.in' => 'Loại tài khoản phải là INDIVIDUAL hoặc COOPERATIVE.',
        ];
    }
}
