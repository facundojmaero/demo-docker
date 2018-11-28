from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListCharacters.as_view()),
    path('<int:id>/', views.DetailCharacter.as_view()),
    path('character/<int:id>/', views.CharacterEpisodes.as_view()),
    path('updateCharacterDatabase/', views.UpdateDatabase.as_view()),
]