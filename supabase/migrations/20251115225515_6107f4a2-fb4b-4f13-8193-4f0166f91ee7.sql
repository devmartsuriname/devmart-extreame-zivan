-- Promote info@devmart.sr to super_admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('2563a854-2a4b-49b8-9606-dedccdef1950', 'super_admin')
ON CONFLICT (user_id, role) DO NOTHING;