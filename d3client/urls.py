from django.conf.urls import url

from . import views

urlpatterns = [
    # View Requests
    url(r'^$', views.index, name='index'),
    url(r'^show$', views.show, name='index'),

    # Ajax Requests
    url(r'^file-upload$', views.file_upload, name='index'),# file upload from index page
    url(r'^get-all-keys$', views.get_all_keys, name='keys'),#get all keys from db
]
