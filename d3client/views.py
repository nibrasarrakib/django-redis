from django.shortcuts import render
from django.http import HttpResponse
import redis
# Create your views here.


def index(request):
    context = {}
    return render(request,"d3client/index.html",context)

def file_upload(request):
    key = request.POST['key']
    
    file = request.FILES.get('file')
    data = file.read()
    r = redis.StrictRedis(host='localhost', port=6379, db=0)
    r.set(key,r)
    return HttpResponse(data)

def test():
    return 1
