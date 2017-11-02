import redis
import sys
import json

from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def index(request):
    context = {}
    return render(request, "d3client/index.html", context)


def file_upload(request):
    try:
        key = request.POST['key']
        file = request.FILES.get('file')
        data = file.read()
        r = redis.StrictRedis(host='localhost', port=6379, db=0)
        r.set(key, data)
        return HttpResponse("Data Uploaded Successfully")
    except:
        return HttpResponse(sys.exc_info()[0])


def show(request):
    context = {}
    return render(request, "d3client/show.html", context)


def get_all_keys(request):
    request_key = json.loads(request.body.decode('utf-8'))["key"]
    r = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)
    if request_key == "all":
        k = r.keys()
        return HttpResponse(json.dumps(k))
    else:
        k = r.get(request_key)
        return HttpResponse(json.dumps(k))


def test():
    return 1
