from django.shortcuts import render
import requests

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from nameko.standalone.rpc import ClusterRpcProxy

from .models import Character

from django.http import JsonResponse
from django.forms.models import model_to_dict

import json

CONFIG = {'AMQP_URI': "amqp://guest:guest@rabbitmq"}

class ListCharacters(APIView):
    """Returns all the Rick and Morty Character names and their IDs"""

    def get(self, request):
        characterList = []
        for character in Character.objects.all():
            characterList.append(model_to_dict(character))

        return Response(characterList, status=status.HTTP_200_OK)

class UpdateDatabase(APIView):
    
    def get(self, request):

        pages = self.getNumberOfPages()

        for page in range(1, pages+1):
            with ClusterRpcProxy(CONFIG) as rpc:
                characterList = rpc.rickService.listCharacters(page)

            for character in characterList['results']:
                entry = Character(
                    name = character['name'],
                    status = character['status'],
                    species = character['species'],
                    gender = character['gender'],
                    id = character['id'],
                    image = character['image']
                )
                entry.save()

        return Response(status=status.HTTP_200_OK)

    def getNumberOfPages(self):
        with ClusterRpcProxy(CONFIG) as rpc:
            characterList = rpc.rickService.listCharacters()

        return characterList['info']['pages']



class DetailCharacter(APIView):
    """Returns data from a single character"""

    def get(self, request, id):

        character = {}

        if (Character.objects.filter(pk=id).exists()):
            characterObject = Character.objects.get(pk=id)
            character = model_to_dict(characterObject)
        else:
            with ClusterRpcProxy(CONFIG) as rpc:
                character = rpc.rickService.getCharacterData(id)

        return Response(character, status=status.HTTP_200_OK)
        
class CharacterEpisodes(APIView):
    """Returns a list of every episode the chararter appears in"""
    def get(self, request, id):

        with ClusterRpcProxy(CONFIG) as rpc:
            episodes = rpc.rickService.getChapters(id)


        return Response(episodes, status=status.HTTP_200_OK)