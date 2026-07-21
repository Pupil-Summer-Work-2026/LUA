from django.db import migrations


SERVICE_TAG_NAMES = tuple(f"{number:02}" for number in range(1, 13))


def add_sample_service_tags(apps, schema_editor):
    Member = apps.get_model("blogs", "Member")
    MemberTag = apps.get_model("blogs", "MemberTag")
    tags = {
        name: MemberTag.objects.get_or_create(name=name)[0]
        for name in SERVICE_TAG_NAMES
    }

    for index, member in enumerate(Member.objects.order_by("id")):
        member.tags.add(tags[SERVICE_TAG_NAMES[index % len(SERVICE_TAG_NAMES)]])
        if index % 3 == 0:
            member.tags.add(tags[SERVICE_TAG_NAMES[(index + 4) % len(SERVICE_TAG_NAMES)]])


def remove_sample_service_tags(apps, schema_editor):
    MemberTag = apps.get_model("blogs", "MemberTag")
    MemberTag.objects.filter(name__in=SERVICE_TAG_NAMES).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("blogs", "0005_membertag_member_tags"),
    ]

    operations = [
        migrations.RunPython(add_sample_service_tags, remove_sample_service_tags),
    ]