from django.db import models

# Create your models here.

class Character(models.Model):
    name = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    species = models.CharField(max_length=50)
    gender = models.CharField(max_length=50)
    id = models.IntegerField(primary_key=True)
    image = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.name