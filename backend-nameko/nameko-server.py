# import yagmail
from nameko.rpc import rpc, RpcProxy
import requests


# class Mail(object):
#     name = "mail"

#     @rpc
#     def send(self, to, subject, contents):
#         print(
#             u'Sending email "%s" to "%s" with contents "%s"' %
#             (subject, to, contents)
#         )
#         return

#         # yag = yagmail.SMTP(settings.EMAIL, settings.PASSWORD)

#         # yag.send(cc=to.encode('utf-8'),
#         #          subject=subject.encode('utf-8'),
#         #          contents=[contents.encode('utf-8')])

class rickService(object):
    name = "rickService"

    @rpc
    def getChapters(self, characterID):

        print("Nameko: Trying to fetch chapters of character " + str(characterID))

        url = "https://rickandmortyapi.com/api/character/" + str(characterID)
        r = requests.get(url)
        characterData = r.json()

        episodes = []
        keysToGet = ["name", "episode"]

        for episodeURL in characterData["episode"]:
            r = requests.get(episodeURL)
            episodeData = r.json()
            episodeSimpleModel = {}

            for key in keysToGet:
                episodeSimpleModel[key] = episodeData[key]

            episodes.append(episodeSimpleModel)
        print("done!")
        return episodes

    @rpc
    def getCharacterData(self, id):

        print("Nameko: Trying to fetch chapters of character " + str(id))

        url = "https://rickandmortyapi.com/api/character/" + str(id)
        r = requests.get(url)
        return r.json()

    @rpc
    def listCharacters(self, pageNumber=None): 

        print("Nameko: Trying to fetch all character names, page " + str(pageNumber))

        if (pageNumber is None):
            url = "https://rickandmortyapi.com/api/character/"
        else:
            url = "https://rickandmortyapi.com/api/character/" + "?page=" + str(pageNumber)
        
        r = requests.get(url)
        return r.json()
