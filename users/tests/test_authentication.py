from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model


class BaseTest(TestCase):
    def setUp(self):
        self.register_url = reverse('users:signup-page')
        get_user = get_user_model()
        self.user = get_user.objects.create_users(email='testemail@gmail.com',
                                                  password='testpassword',
                                                  name='Testname')
        self.superuser = get_user.objects.create_superuser(email='superuser@gmail.com',
                                                           password='testpassword',
                                                           name='Testname')
        return super().setUp()


class RegisterTest(BaseTest):
    def test_can_view_page_correctly(self):
        response = self.client.get(self.register_url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'users/signup.html')

    def test_can_register_user(self):
        # response = self.client.post(self.register_url,
        #                             {
        #                                'email':'testemail@gmail.com',
        #                                'password1':'testpassword',
        #                                'name':'Testname',
        #                                'password2':'testpassword',
        #                                'date_of_birth':'01-01-2001'
        #                             },
        #                             content_type='text/html')
        # self.assertRedirects(response, reverse('users:login-page'))
        self.assertTrue(self.user.is_active)
        self.assertFalse(self.user.is_staff)
        self.assertFalse(self.user.is_superuser)

    def test_can_resister_superuser(self):
        self.assertTrue(self.superuser.is_active)
        self.assertTrue(self.superuser.is_staff)
        self.assertTrue(self.superuser.is_superuser)
