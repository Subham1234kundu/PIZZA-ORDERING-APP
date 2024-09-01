CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


create policy "Allow authenticated users to read and create  1e6ovep_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'products-images'::text));


create policy "Allow authenticated users to read and create  1e6ovep_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'products-images'::text));


create policy "Anyone can upload an avatar."
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'avatars'::text));


create policy "Avatar images are publicly accessible."
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'avatars'::text));



