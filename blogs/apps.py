from django.apps import AppConfig


class BlogsConfig(AppConfig):
    name = 'blogs'

    def ready(self):
        from . import checks  # noqa: F401
