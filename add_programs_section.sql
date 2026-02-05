-- Add ProgramAccordion to CMS (only insert if not exists)
INSERT INTO content_sections (section_key, title, content, media_urls)
SELECT * FROM (VALUES
  -- Programs Header
  ('programs_header', 
  '{
    "en": "Our Programs", 
    "fr": "Nos Programmes", 
    "rw": "Gahunda Zacu", 
    "ar": "برامجنا"
  }'::jsonb,
  '{
    "en": "Through our diverse range of programs, we address countless challenges, resources, and opportunities to create lasting impact in communities.", 
    "fr": "Grâce à notre gamme diversifiée de programmes, nous abordons d''innombrables défis, ressources et opportunités pour créer un impact durable dans les communautés.", 
    "rw": "Binyuze muri gahunda zacu zitandukanye, dukemura ibibazo byinshi, umutungo, n''amahirwe yo gukora ingaruka zihoraho mu miryango.", 
    "ar": "من خلال مجموعتنا المتنوعة من البرامج، نعالج تحديات وموارد وفرص لا حصر لها لخلق تأثير دائم في المجتمعات."
  }'::jsonb,
  '[]'::jsonb),

  -- Program 1: Social Protection
  ('program_social_protection', 
  '{
    "en": "Social Protection Programs", 
    "fr": "Programmes de Protection Sociale", 
    "rw": "Gahunda zo Kurinda Imibereho", 
    "ar": "برامج الحماية الاجتماعية"
  }'::jsonb,
  '{
    "en": "Supporting vulnerable families, orphans, widows, and disadvantaged households to restore dignity and stability through comprehensive assistance and community support.", 
    "fr": "Soutenir les familles vulnérables, les orphelins, les veuves et les ménages défavorisés pour restaurer la dignité et la stabilité grâce à une assistance complète et un soutien communautaire.", 
    "rw": "Gufasha imiryango ifite ibibazo, imfubyi, abapfakazi, n''imiryango ifite ibibazo kugira ngo bagarure icyubahiro n''umutekano binyuze mu bufasha busesuye n''ubufasha bw''abaturage.", 
    "ar": "دعم الأسر الضعيفة والأيتام والأرامل والأسر المحرومة لاستعادة الكرامة والاستقرار من خلال المساعدة الشاملة والدعم المجتمعي."
  }'::jsonb,
  '["/programs/social-protection/social-protection-1.jpg"]'::jsonb),

  -- Program 2: Emergency Relief
  ('program_emergency_relief', 
  '{
    "en": "Emergency Relief Programs", 
    "fr": "Programmes d''Aide d''Urgence", 
    "rw": "Gahunda z''Ubufasha bw''Ihutirwa", 
    "ar": "برامج الإغاثة الطارئة"
  }'::jsonb,
  '{
    "en": "Providing immediate humanitarian assistance during crises, disasters, and urgent community needs to ensure rapid response and recovery.", 
    "fr": "Fournir une assistance humanitaire immédiate lors de crises, de catastrophes et de besoins communautaires urgents pour assurer une réponse et une récupération rapides.", 
    "rw": "Gutanga ubufasha bw''ikiremwamuntu ako kanya mu bihe by''akaga, ibiza, n''ibikenewe by''abaturage byihutirwa kugira ngo habeho igisubizo cyihuse no gukira.", 
    "ar": "تقديم المساعدة الإنسانية الفورية أثناء الأزمات والكوارث والاحتياجات المجتمعية العاجلة لضمان الاستجابة والتعافي السريع."
  }'::jsonb,
  '["/programs/emergency-relief/emergency-relief-1.jpg"]'::jsonb),

  -- Program 3: Education
  ('program_education', 
  '{
    "en": "Education Programs", 
    "fr": "Programmes d''Éducation", 
    "rw": "Gahunda z''Uburezi", 
    "ar": "البرامج التعليمية"
  }'::jsonb,
  '{
    "en": "Promoting access to education, vocational training, and life skills development for children and youth to build sustainable futures.", 
    "fr": "Promouvoir l''accès à l''éducation, à la formation professionnelle et au développement des compétences de vie pour les enfants et les jeunes afin de construire des avenirs durables.", 
    "rw": "Guteza imbere ubushobozi bwo kwiga, amahugurwa y''umwuga, n''iterambere ry''ubumenyi bw''ubuzima ku bana n''urubyiruko kugira ngo tubake ejo hazaza rirambye.", 
    "ar": "تعزيز الوصول إلى التعليم والتدريب المهني وتنمية المهارات الحياتية للأطفال والشباب لبناء مستقبل مستدام."
  }'::jsonb,
  '["/programs/education/education-1.jpg"]'::jsonb),

  -- Program 4: Faith-Based
  ('program_faith_based', 
  '{
    "en": "Faith-Based Programs", 
    "fr": "Programmes Confessionnels", 
    "rw": "Gahunda Zishingiye ku Idini", 
    "ar": "البرامج القائمة على الإيمان"
  }'::jsonb,
  '{
    "en": "Strengthening moral values, spiritual resilience, and ethical leadership through religious teachings and counseling for community transformation.", 
    "fr": "Renforcer les valeurs morales, la résilience spirituelle et le leadership éthique par l''enseignement religieux et le conseil pour la transformation communautaire.", 
    "rw": "Gushimangira indangagaciro z''imyitwarire, gukomera mu mwuka, n''ubuyobozi bw''imyitwarire binyuze mu nyigisho z''idini n''ubujyanama kugira ngo habeho impinduka mu miryango.", 
    "ar": "تعزيز القيم الأخلاقية والمرونة الروحية والقيادة الأخلاقية من خلال التعاليم الدينية والإرشاد لتحويل المجتمع."
  }'::jsonb,
  '["/programs/faith-based/faith-based-1.jpg"]'::jsonb),

  -- Program 5: Women & Youth Empowerment
  ('program_women_youth', 
  '{
    "en": "Women & Youth Empowerment Programs", 
    "fr": "Programmes d''Autonomisation des Femmes et des Jeunes", 
    "rw": "Gahunda zo Guha Imbaraga Abagore n''Urubyiruko", 
    "ar": "برامج تمكين المرأة والشباب"
  }'::jsonb,
  '{
    "en": "Equipping women and young people with skills, resources, and opportunities for self-reliance and economic independence.", 
    "fr": "Équiper les femmes et les jeunes avec des compétences, des ressources et des opportunités pour l''autonomie et l''indépendance économique.", 
    "rw": "Guha abagore n''urubyiruko ubumenyi, umutungo, n''amahirwe yo kwigenga no kwigenga mu bukungu.", 
    "ar": "تزويد النساء والشباب بالمهارات والموارد والفرص للاعتماد على الذات والاستقلال الاقتصادي."
  }'::jsonb,
  '["/programs/women-youth-empowerment/women-youth-1.jpg"]'::jsonb),

  -- Program 6: Family Protection
  ('program_family_protection', 
  '{
    "en": "Family Protection & Divorce Prevention Programs", 
    "fr": "Programmes de Protection de la Famille et de Prévention du Divorce", 
    "rw": "Gahunda zo Kurinda Imiryango no Gukumira Gutandukana", 
    "ar": "برامج حماية الأسرة ومنع الطلاق"
  }'::jsonb,
  '{
    "en": "Protecting the family unit by addressing the root causes of divorce through religious teachings, counseling, dialogue, and family mediation.", 
    "fr": "Protéger l''unité familiale en s''attaquant aux causes profondes du divorce par l''enseignement religieux, le conseil, le dialogue et la médiation familiale.", 
    "rw": "Kurinda imiryango mu gukemura impamvu nyamukuru z''gutandukana binyuze mu nyigisho z''idini, ubujyanama, ibiganiro, n''ubuhuza bw''imiryango.", 
    "ar": "حماية الوحدة الأسرية من خلال معالجة الأسباب الجذرية للطلاق من خلال التعاليم الدينية والإرشاد والحوار والوساطة الأسرية."
  }'::jsonb,
  '["/programs/family-protection/family-protection-1.jpg"]'::jsonb)
) AS v(section_key, title, content, media_urls)
WHERE NOT EXISTS (
  SELECT 1 FROM content_sections WHERE content_sections.section_key = v.section_key
);
