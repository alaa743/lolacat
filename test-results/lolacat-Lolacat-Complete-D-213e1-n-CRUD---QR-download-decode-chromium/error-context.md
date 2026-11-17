# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lolacat.spec.ts >> Lolacat>< Complete Digital Menu E2E >> splash -> Arabic RTL -> category -> search -> details -> admin CRUD -> QR download & decode
- Location: e2e\lolacat.spec.ts:7:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('لقيمات صغيرة.. سعادة كبيرة.')
Expected: visible
Error: strict mode violation: getByText('لقيمات صغيرة.. سعادة كبيرة.') resolved to 2 elements:
    1) <h1 class="font-display text-3xl font-bold leading-tight tracking-tight text-brand-ink sm:text-5xl">لقيمات صغيرة.. سعادة كبيرة.</h1> aka getByRole('heading', { name: 'لقيمات صغيرة.. سعادة كبيرة' })
    2) <p class="text-sm font-medium text-brand-pink">لقيمات صغيرة.. سعادة كبيرة.</p> aka getByRole('contentinfo').getByText('لقيمات صغيرة.. سعادة كبيرة')

Call log:
  - Expect "toBeVisible" getByText('لقيمات صغيرة.. سعادة كبيرة.') with timeout 5000ms
  - waiting for getByText('لقيمات صغيرة.. سعادة كبيرة.')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "Lolacat>< Home" [ref=e6] [cursor=pointer]:
        - /url: /
        - generic [ref=e7]: Lolacat><
      - navigation "Main navigation" [ref=e17]:
        - button "الأقسام" [ref=e18] [cursor=pointer]
        - button "الأطباق المميزة" [ref=e19] [cursor=pointer]
        - button "القائمة" [ref=e20] [cursor=pointer]
        - button "الموقع والمواعيد" [ref=e21] [cursor=pointer]
      - generic [ref=e22]:
        - button "بحث" [ref=e23] [cursor=pointer]
        - group "تغيير اللغة" [ref=e27]:
          - button "EN" [ref=e28] [cursor=pointer]
          - button "AR" [active] [pressed] [ref=e29] [cursor=pointer]
        - link "لوحة التحكم" [ref=e30] [cursor=pointer]:
          - /url: /admin
  - main [ref=e35]:
    - generic [ref=e36]:
      - generic [ref=e38]:
        - generic [ref=e39]:
          - generic [ref=e40]:
            - generic [ref=e41]: Lolacat><
            - generic [ref=e45]: سوشي ونودلز يابانية
          - heading "لقيمات صغيرة.. سعادة كبيرة." [level=1] [ref=e46]
          - paragraph [ref=e47]: اكتشف عالم السوشي والرامن والنكهات اليابانية المميزة.
          - generic [ref=e48]:
            - button "تصفح القائمة" [ref=e49] [cursor=pointer]
            - button "الأكثر طلباً" [ref=e53] [cursor=pointer]
        - generic [ref=e55]:
          - img "Lolacat>< Japanese sushi rolls, ramen, and matcha spread" [ref=e57]
          - generic [ref=e58]: Lolacat>< Tokyo Craft
      - generic [ref=e59]:
        - generic [ref=e60]:
          - heading "أقسام القائمة" [level=2] [ref=e61]
          - paragraph [ref=e62]: أطباق يابانية محضرة بعناية وطازجة عند الطلب
        - generic [ref=e63]:
          - link "لفائف السوشي 6 أطباق لفائف السوشي لفائف ماكي وأوراماكي محضرة يدوياً بأرز السوشي المتبل وأوراق النوري المقرمشة. عرض التفاصيل" [ref=e64] [cursor=pointer]:
            - /url: /menu/category/cat-sushi-rolls
            - generic [ref=e65]:
              - img "لفائف السوشي" [ref=e67]
              - generic [ref=e68]: 6 أطباق
            - generic [ref=e69]:
              - generic [ref=e70]:
                - heading "لفائف السوشي" [level=3] [ref=e71]
                - paragraph [ref=e72]: لفائف ماكي وأوراماكي محضرة يدوياً بأرز السوشي المتبل وأوراق النوري المقرمشة.
              - generic [ref=e73]: عرض التفاصيل
          - link "نيجيري وساشيمي 5 أطباق نيجيري وساشيمي شرائح ساشيمي طازجة مقطعة بدقة وقطع نيجيري كلاسيكية. عرض التفاصيل" [ref=e78] [cursor=pointer]:
            - /url: /menu/category/cat-nigiri-sashimi
            - generic [ref=e79]:
              - img "نيجيري وساشيمي" [ref=e81]
              - generic [ref=e82]: 5 أطباق
            - generic [ref=e83]:
              - generic [ref=e84]:
                - heading "نيجيري وساشيمي" [level=3] [ref=e85]
                - paragraph [ref=e86]: شرائح ساشيمي طازجة مقطعة بدقة وقطع نيجيري كلاسيكية.
              - generic [ref=e87]: عرض التفاصيل
          - link "رامن ونودلز 6 أطباق رامن ونودلز مرق ياباني مطهو ببطء ونودلز طازجة وأطباق ووك مقرمشة. عرض التفاصيل" [ref=e92] [cursor=pointer]:
            - /url: /menu/category/cat-ramen-noodles
            - generic [ref=e93]:
              - img "رامن ونودلز" [ref=e95]
              - generic [ref=e96]: 6 أطباق
            - generic [ref=e97]:
              - generic [ref=e98]:
                - heading "رامن ونودلز" [level=3] [ref=e99]
                - paragraph [ref=e100]: مرق ياباني مطهو ببطء ونودلز طازجة وأطباق ووك مقرمشة.
              - generic [ref=e101]: عرض التفاصيل
          - link "أطباق الأرز 4 أطباق أطباق الأرز أطباق دونبوري دافئة وبوكي بول طازجة مع صلصات يابانية غنية. عرض التفاصيل" [ref=e106] [cursor=pointer]:
            - /url: /menu/category/cat-rice-bowls
            - generic [ref=e107]:
              - img "أطباق الأرز" [ref=e109]
              - generic [ref=e110]: 4 أطباق
            - generic [ref=e111]:
              - generic [ref=e112]:
                - heading "أطباق الأرز" [level=3] [ref=e113]
                - paragraph [ref=e114]: أطباق دونبوري دافئة وبوكي بول طازجة مع صلصات يابانية غنية.
              - generic [ref=e115]: عرض التفاصيل
          - link "مقبلات يابانية 4 أطباق مقبلات يابانية تمبورا مقرمشة وجيوزا مشوية ومقبلات مثالية للمشاركة. عرض التفاصيل" [ref=e120] [cursor=pointer]:
            - /url: /menu/category/cat-appetizers
            - generic [ref=e121]:
              - img "مقبلات يابانية" [ref=e123]
              - generic [ref=e124]: 4 أطباق
            - generic [ref=e125]:
              - generic [ref=e126]:
                - heading "مقبلات يابانية" [level=3] [ref=e127]
                - paragraph [ref=e128]: تمبورا مقرمشة وجيوزا مشوية ومقبلات مثالية للمشاركة.
              - generic [ref=e129]: عرض التفاصيل
          - link "حلويات 3 أطباق حلويات حلويات يابانية ناعمة بنكهة الماتشا والكريمة والموتشي. عرض التفاصيل" [ref=e134] [cursor=pointer]:
            - /url: /menu/category/cat-desserts
            - generic [ref=e135]:
              - img "حلويات" [ref=e137]
              - generic [ref=e138]: 3 أطباق
            - generic [ref=e139]:
              - generic [ref=e140]:
                - heading "حلويات" [level=3] [ref=e141]
                - paragraph [ref=e142]: حلويات يابانية ناعمة بنكهة الماتشا والكريمة والموتشي.
              - generic [ref=e143]: عرض التفاصيل
          - link "مشروبات 4 أطباق مشروبات ماتشا لاتيه يابانية وشاي مثلج ومشروبات حليب منعشة. عرض التفاصيل" [ref=e148] [cursor=pointer]:
            - /url: /menu/category/cat-drinks
            - generic [ref=e149]:
              - img "مشروبات" [ref=e151]
              - generic [ref=e152]: 4 أطباق
            - generic [ref=e153]:
              - generic [ref=e154]:
                - heading "مشروبات" [level=3] [ref=e155]
                - paragraph [ref=e156]: ماتشا لاتيه يابانية وشاي مثلج ومشروبات حليب منعشة.
              - generic [ref=e157]: عرض التفاصيل
      - generic [ref=e163]:
        - generic [ref=e164]:
          - generic [ref=e165]: Lolacat><
          - heading "مختارات لولا كات المميزة" [level=2] [ref=e169]
          - paragraph [ref=e170]: أشهى لفائف السوشي وأطباق الرامن المحبوبة لدى ضيوفنا
        - generic [ref=e171]:
          - link "سبايسي سلمون رول الأكثر طلباً سبايسي سلمون رول سلمون نرويجي طازج مع مايونيز سريراتشا الحار ورقائق تمبورا مقرمشة وبصل أخضر. ٢٧٥ ج.م ٣١٠ ج.م 14 دقيقة" [ref=e172] [cursor=pointer]:
            - /url: /menu/item/item-spicy-salmon-roll
            - generic [ref=e173]:
              - img "سبايسي سلمون رول" [ref=e175]
              - generic [ref=e176]: الأكثر طلباً
            - generic [ref=e188]:
              - generic [ref=e189]:
                - heading "سبايسي سلمون رول" [level=3] [ref=e191]
                - paragraph [ref=e192]: سلمون نرويجي طازج مع مايونيز سريراتشا الحار ورقائق تمبورا مقرمشة وبصل أخضر.
              - generic [ref=e193]:
                - generic [ref=e194]:
                  - generic [ref=e195]: ٢٧٥ ج.م
                  - generic [ref=e196]: ٣١٠ ج.م
                - generic [ref=e197]: 14 دقيقة
          - link "دراجون رول الأكثر طلباً دراجون رول تمبورا روبيان ذهبية وخيار ملفوف بشرائح الأفوكادو مع صلصة الأوناجي الحلوة. ٣٤٥ ج.م ٣٨٥ ج.م 16 دقيقة" [ref=e202] [cursor=pointer]:
            - /url: /menu/item/item-dragon-roll
            - generic [ref=e203]:
              - img "دراجون رول" [ref=e205]
              - generic [ref=e206]: الأكثر طلباً
            - generic [ref=e211]:
              - generic [ref=e212]:
                - heading "دراجون رول" [level=3] [ref=e214]
                - paragraph [ref=e215]: تمبورا روبيان ذهبية وخيار ملفوف بشرائح الأفوكادو مع صلصة الأوناجي الحلوة.
              - generic [ref=e216]:
                - generic [ref=e217]:
                  - generic [ref=e218]: ٣٤٥ ج.م
                  - generic [ref=e219]: ٣٨٥ ج.م
                - generic [ref=e220]: 16 دقيقة
          - link "تونكوتسو رامن الأكثر طلباً تونكوتسو رامن مرق غني مطهو ١٤ ساعة مع نودلز الرامن وبيض أجيتاما نصف مسلوق وشرائح لحم مشوية ونوري وزيت الثوم الأسود. ٣٣٥ ج.م ٣٧٠ ج.م 18 دقيقة" [ref=e225] [cursor=pointer]:
            - /url: /menu/item/item-tonkotsu-ramen
            - generic [ref=e226]:
              - img "تونكوتسو رامن" [ref=e228]
              - generic [ref=e229]: الأكثر طلباً
            - generic [ref=e234]:
              - generic [ref=e235]:
                - heading "تونكوتسو رامن" [level=3] [ref=e237]
                - paragraph [ref=e238]: مرق غني مطهو ١٤ ساعة مع نودلز الرامن وبيض أجيتاما نصف مسلوق وشرائح لحم مشوية ونوري وزيت الثوم الأسود.
              - generic [ref=e239]:
                - generic [ref=e240]:
                  - generic [ref=e241]: ٣٣٥ ج.م
                  - generic [ref=e242]: ٣٧٠ ج.م
                - generic [ref=e243]: 18 دقيقة
          - link "سبايسي ميسو رامن الأكثر طلباً سبايسي ميسو رامن مرق ميسو هوكايدو الحار بزيت الفلفل الياباني مع ذرة حلوة وبراعم الخيزران وبيض متبل. ٣٢٥ ج.م 18 دقيقة" [ref=e248] [cursor=pointer]:
            - /url: /menu/item/item-spicy-miso-ramen
            - generic [ref=e249]:
              - img "سبايسي ميسو رامن" [ref=e251]
              - generic [ref=e252]: الأكثر طلباً
            - generic [ref=e266]:
              - generic [ref=e267]:
                - heading "سبايسي ميسو رامن" [level=3] [ref=e269]
                - paragraph [ref=e270]: مرق ميسو هوكايدو الحار بزيت الفلفل الياباني مع ذرة حلوة وبراعم الخيزران وبيض متبل.
              - generic [ref=e271]:
                - generic [ref=e272]: ٣٢٥ ج.م
                - generic [ref=e274]: 18 دقيقة
      - generic [ref=e279]:
        - generic [ref=e280]:
          - heading "القائمة الكاملة" [level=2] [ref=e281]
          - paragraph [ref=e282]: ابحث باسم الطبق أو المكونات أو صفِّ حسب رغبتك
        - generic [ref=e283]:
          - searchbox "ابحث عن سوشي، رامن، سلمون، حار..." [ref=e285]
          - generic [ref=e286]:
            - generic [ref=e287]:
              - button "كل الأقسام" [ref=e288] [cursor=pointer]
              - button "لفائف السوشي" [ref=e289] [cursor=pointer]
              - button "نيجيري وساشيمي" [ref=e290] [cursor=pointer]
              - button "رامن ونودلز" [ref=e291] [cursor=pointer]
              - button "أطباق الأرز" [ref=e292] [cursor=pointer]
              - button "مقبلات يابانية" [ref=e293] [cursor=pointer]
              - button "حلويات" [ref=e294] [cursor=pointer]
              - button "مشروبات" [ref=e295] [cursor=pointer]
            - generic [ref=e296]:
              - generic [ref=e297]:
                - button "الأكثر طلباً" [ref=e298] [cursor=pointer]
                - button "المتوفر فقط" [ref=e299] [cursor=pointer]
                - button "نباتي" [ref=e300] [cursor=pointer]
                - button "نباتي صرف" [ref=e301] [cursor=pointer]
                - button "خالي من الجلوتين" [ref=e302] [cursor=pointer]
              - generic [ref=e303]:
                - combobox "مستوى الحرارة" [ref=e304]:
                  - option "كل المستويات" [selected]
                  - option "حار خفيف"
                  - option "حار متوسط"
                  - option "حار جداً"
                - combobox "ترتيب حسب" [ref=e305]:
                  - option "المقترح" [selected]
                  - 'option "السعر: من الأقل للأعلى"'
                  - 'option "السعر: من الأعلى للأقل"'
                  - option "الأكثر شهرة"
        - generic [ref=e306]: تم العثور على 32 طبقاً
        - generic [ref=e308]:
          - link "سبايسي سلمون رول الأكثر طلباً سبايسي سلمون رول سلمون نرويجي طازج مع مايونيز سريراتشا الحار ورقائق تمبورا مقرمشة وبصل أخضر. ٢٧٥ ج.م ٣١٠ ج.م 14 دقيقة" [ref=e309] [cursor=pointer]:
            - /url: /menu/item/item-spicy-salmon-roll
            - generic [ref=e310]:
              - img "سبايسي سلمون رول" [ref=e312]
              - generic [ref=e313]: الأكثر طلباً
            - generic [ref=e325]:
              - generic [ref=e326]:
                - heading "سبايسي سلمون رول" [level=3] [ref=e328]
                - paragraph [ref=e329]: سلمون نرويجي طازج مع مايونيز سريراتشا الحار ورقائق تمبورا مقرمشة وبصل أخضر.
              - generic [ref=e330]:
                - generic [ref=e331]:
                  - generic [ref=e332]: ٢٧٥ ج.م
                  - generic [ref=e333]: ٣١٠ ج.م
                - generic [ref=e334]: 14 دقيقة
          - link "دراجون رول الأكثر طلباً دراجون رول تمبورا روبيان ذهبية وخيار ملفوف بشرائح الأفوكادو مع صلصة الأوناجي الحلوة. ٣٤٥ ج.م ٣٨٥ ج.م 16 دقيقة" [ref=e339] [cursor=pointer]:
            - /url: /menu/item/item-dragon-roll
            - generic [ref=e340]:
              - img "دراجون رول" [ref=e342]
              - generic [ref=e343]: الأكثر طلباً
            - generic [ref=e348]:
              - generic [ref=e349]:
                - heading "دراجون رول" [level=3] [ref=e351]
                - paragraph [ref=e352]: تمبورا روبيان ذهبية وخيار ملفوف بشرائح الأفوكادو مع صلصة الأوناجي الحلوة.
              - generic [ref=e353]:
                - generic [ref=e354]:
                  - generic [ref=e355]: ٣٤٥ ج.م
                  - generic [ref=e356]: ٣٨٥ ج.م
                - generic [ref=e357]: 16 دقيقة
          - link "تونكوتسو رامن الأكثر طلباً تونكوتسو رامن مرق غني مطهو ١٤ ساعة مع نودلز الرامن وبيض أجيتاما نصف مسلوق وشرائح لحم مشوية ونوري وزيت الثوم الأسود. ٣٣٥ ج.م ٣٧٠ ج.م 18 دقيقة" [ref=e362] [cursor=pointer]:
            - /url: /menu/item/item-tonkotsu-ramen
            - generic [ref=e363]:
              - img "تونكوتسو رامن" [ref=e365]
              - generic [ref=e366]: الأكثر طلباً
            - generic [ref=e371]:
              - generic [ref=e372]:
                - heading "تونكوتسو رامن" [level=3] [ref=e374]
                - paragraph [ref=e375]: مرق غني مطهو ١٤ ساعة مع نودلز الرامن وبيض أجيتاما نصف مسلوق وشرائح لحم مشوية ونوري وزيت الثوم الأسود.
              - generic [ref=e376]:
                - generic [ref=e377]:
                  - generic [ref=e378]: ٣٣٥ ج.م
                  - generic [ref=e379]: ٣٧٠ ج.م
                - generic [ref=e380]: 18 دقيقة
          - link "سبايسي ميسو رامن الأكثر طلباً سبايسي ميسو رامن مرق ميسو هوكايدو الحار بزيت الفلفل الياباني مع ذرة حلوة وبراعم الخيزران وبيض متبل. ٣٢٥ ج.م 18 دقيقة" [ref=e385] [cursor=pointer]:
            - /url: /menu/item/item-spicy-miso-ramen
            - generic [ref=e386]:
              - img "سبايسي ميسو رامن" [ref=e388]
              - generic [ref=e389]: الأكثر طلباً
            - generic [ref=e403]:
              - generic [ref=e404]:
                - heading "سبايسي ميسو رامن" [level=3] [ref=e406]
                - paragraph [ref=e407]: مرق ميسو هوكايدو الحار بزيت الفلفل الياباني مع ذرة حلوة وبراعم الخيزران وبيض متبل.
              - generic [ref=e408]:
                - generic [ref=e409]: ٣٢٥ ج.م
                - generic [ref=e411]: 18 دقيقة
          - link "سلمون بوكي بول الأكثر طلباً سلمون بوكي بول مكعبات سلمون طازج متبلة بصلصة اليوزو بونزو فوق أرز السوشي مع أفوكادو وإيدامامي ومانجو. خالي من الجلوتين ٣٤٠ ج.م 12 دقيقة" [ref=e416] [cursor=pointer]:
            - /url: /menu/item/item-salmon-poke-bowl
            - generic [ref=e417]:
              - img "سلمون بوكي بول" [ref=e420]
              - generic [ref=e421]: الأكثر طلباً
            - generic [ref=e426]:
              - generic [ref=e427]:
                - heading "سلمون بوكي بول" [level=3] [ref=e429]
                - paragraph [ref=e430]: مكعبات سلمون طازج متبلة بصلصة اليوزو بونزو فوق أرز السوشي مع أفوكادو وإيدامامي ومانجو.
                - generic [ref=e431]: خالي من الجلوتين
              - generic [ref=e445]:
                - generic [ref=e446]: ٣٤٠ ج.م
                - generic [ref=e448]: 12 دقيقة
          - link "جيوزا مشوية الأكثر طلباً جيوزا مشوية ست قطع من زلابية الجيوزا المقرمشة المحشوة بالدجاج والزنجبيل مع صلصة الصويا بالسمسم. ١٧٥ ج.م 10 دقيقة" [ref=e453] [cursor=pointer]:
            - /url: /menu/item/item-gyoza
            - generic [ref=e454]:
              - img "جيوزا مشوية" [ref=e457]
              - generic [ref=e458]: الأكثر طلباً
            - generic [ref=e468]:
              - generic [ref=e469]:
                - heading "جيوزا مشوية" [level=3] [ref=e471]
                - paragraph [ref=e472]: ست قطع من زلابية الجيوزا المقرمشة المحشوة بالدجاج والزنجبيل مع صلصة الصويا بالسمسم.
              - generic [ref=e473]:
                - generic [ref=e474]: ١٧٥ ج.م
                - generic [ref=e476]: 10 دقيقة
          - link "تشيز كيك الماتشا الأكثر طلباً تشيز كيك الماتشا تشيز كيك ياباني كريمي غني بشاي الماتشا الأخضر الفاخر مع كريمة مخفوقة خفيفة. نباتي ١٦٥ ج.م 5 دقيقة" [ref=e481] [cursor=pointer]:
            - /url: /menu/item/item-matcha-cheesecake
            - generic [ref=e482]:
              - img "تشيز كيك الماتشا" [ref=e485]
              - generic [ref=e486]: الأكثر طلباً
            - generic [ref=e491]:
              - generic [ref=e492]:
                - heading "تشيز كيك الماتشا" [level=3] [ref=e494]
                - paragraph [ref=e495]: تشيز كيك ياباني كريمي غني بشاي الماتشا الأخضر الفاخر مع كريمة مخفوقة خفيفة.
                - generic [ref=e496]: نباتي
              - generic [ref=e502]:
                - generic [ref=e503]: ١٦٥ ج.م
                - generic [ref=e505]: 5 دقيقة
          - link "كلاسيك كاليفورنيا رول الأكثر طلباً كلاسيك كاليفورنيا رول أصابع كابوريا مع أفوكادو طازج وخيار مقرمش وبذور سمسم محمصة وتوبيكو برتقالي. ٢٢٥ ج.م 12 دقيقة" [ref=e510] [cursor=pointer]:
            - /url: /menu/item/item-classic-california-roll
            - generic [ref=e511]:
              - img "كلاسيك كاليفورنيا رول" [ref=e514]
              - generic [ref=e515]: الأكثر طلباً
            - generic [ref=e520]:
              - generic [ref=e521]:
                - heading "كلاسيك كاليفورنيا رول" [level=3] [ref=e523]
                - paragraph [ref=e524]: أصابع كابوريا مع أفوكادو طازج وخيار مقرمش وبذور سمسم محمصة وتوبيكو برتقالي.
              - generic [ref=e525]:
                - generic [ref=e526]: ٢٢٥ ج.م
                - generic [ref=e528]: 12 دقيقة
          - link "كريسبي شريمب رول الأكثر طلباً كريسبي شريمب رول روبيان مقلي بالبانكو المقرمش مع مايونيز الفلفل الحلو وفتات التمبورا الذهبية. ٢٩٥ ج.م 15 دقيقة" [ref=e533] [cursor=pointer]:
            - /url: /menu/item/item-crispy-shrimp-roll
            - generic [ref=e534]:
              - img "كريسبي شريمب رول" [ref=e537]
              - generic [ref=e538]: الأكثر طلباً
            - generic [ref=e548]:
              - generic [ref=e549]:
                - heading "كريسبي شريمب رول" [level=3] [ref=e551]
                - paragraph [ref=e552]: روبيان مقلي بالبانكو المقرمش مع مايونيز الفلفل الحلو وفتات التمبورا الذهبية.
              - generic [ref=e553]:
                - generic [ref=e554]: ٢٩٥ ج.م
                - generic [ref=e556]: 15 دقيقة
          - link "سلمون نيجيري الأكثر طلباً سلمون نيجيري قطعتان من أرز السوشي المتبل مغطى بشرائح سلمون أطلسي طازجة وغنية. خالي من الجلوتين ١٦٥ ج.م 8 دقيقة" [ref=e561] [cursor=pointer]:
            - /url: /menu/item/item-salmon-nigiri
            - generic [ref=e562]:
              - img "سلمون نيجيري" [ref=e565]
              - generic [ref=e566]: الأكثر طلباً
            - generic [ref=e571]:
              - generic [ref=e572]:
                - heading "سلمون نيجيري" [level=3] [ref=e574]
                - paragraph [ref=e575]: قطعتان من أرز السوشي المتبل مغطى بشرائح سلمون أطلسي طازجة وغنية.
                - generic [ref=e576]: خالي من الجلوتين
              - generic [ref=e590]:
                - generic [ref=e591]: ١٦٥ ج.م
                - generic [ref=e593]: 8 دقيقة
          - link "سلمون ساشيمي الأكثر طلباً سلمون ساشيمي خمس شرائح سخية من السلمون الطازج تُقدم مع شرائح الفجل الياباني وأوراق الشيسو. خالي من الجلوتين ٢٥٥ ج.م 8 دقيقة" [ref=e598] [cursor=pointer]:
            - /url: /menu/item/item-salmon-sashimi
            - generic [ref=e599]:
              - img "سلمون ساشيمي" [ref=e602]
              - generic [ref=e603]: الأكثر طلباً
            - generic [ref=e608]:
              - generic [ref=e609]:
                - heading "سلمون ساشيمي" [level=3] [ref=e611]
                - paragraph [ref=e612]: خمس شرائح سخية من السلمون الطازج تُقدم مع شرائح الفجل الياباني وأوراق الشيسو.
                - generic [ref=e613]: خالي من الجلوتين
              - generic [ref=e627]:
                - generic [ref=e628]: ٢٥٥ ج.م
                - generic [ref=e630]: 8 دقيقة
          - link "تشكن ياكيسوبا الأكثر طلباً تشكن ياكيسوبا نودلز ياكيسوبا مقلية على الطريقة اليابانية مع قطع الدجاج والخضروات المقرمشة وصلصة ياكيسوبا الخاصة. ٢٥٥ ج.م 14 دقيقة" [ref=e635] [cursor=pointer]:
            - /url: /menu/item/item-chicken-yakisoba
            - generic [ref=e636]:
              - img "تشكن ياكيسوبا" [ref=e639]
              - generic [ref=e640]: الأكثر طلباً
            - generic [ref=e645]:
              - generic [ref=e646]:
                - heading "تشكن ياكيسوبا" [level=3] [ref=e648]
                - paragraph [ref=e649]: نودلز ياكيسوبا مقلية على الطريقة اليابانية مع قطع الدجاج والخضروات المقرمشة وصلصة ياكيسوبا الخاصة.
              - generic [ref=e650]:
                - generic [ref=e651]: ٢٥٥ ج.م
                - generic [ref=e653]: 14 دقيقة
          - link "طبق دجاج ترياكي الأكثر طلباً طبق دجاج ترياكي دجاج مشوي بصلصة الترياكي اللامعة فوق أرز ياباني مبخر مع زنجبيل مخلل وسمسم محمص. ٢٦٥ ج.م 15 دقيقة" [ref=e658] [cursor=pointer]:
            - /url: /menu/item/item-teriyaki-chicken-bowl
            - generic [ref=e659]:
              - img "طبق دجاج ترياكي" [ref=e662]
              - generic [ref=e663]: الأكثر طلباً
            - generic [ref=e668]:
              - generic [ref=e669]:
                - heading "طبق دجاج ترياكي" [level=3] [ref=e671]
                - paragraph [ref=e672]: دجاج مشوي بصلصة الترياكي اللامعة فوق أرز ياباني مبخر مع زنجبيل مخلل وسمسم محمص.
              - generic [ref=e673]:
                - generic [ref=e674]: ٢٦٥ ج.م
                - generic [ref=e676]: 15 دقيقة
          - link "إيدامامي الأكثر طلباً إيدامامي قرون فول الصويا الخضراء المطهوة على البخار مع ملح البحر المقرمش. نباتي نباتي صرف خالي من الجلوتين ١١٥ ج.م 6 دقيقة" [ref=e681] [cursor=pointer]:
            - /url: /menu/item/item-edamame
            - generic [ref=e682]:
              - img "إيدامامي" [ref=e685]
              - generic [ref=e686]: الأكثر طلباً
            - generic [ref=e691]:
              - generic [ref=e692]:
                - heading "إيدامامي" [level=3] [ref=e694]
                - paragraph [ref=e695]: قرون فول الصويا الخضراء المطهوة على البخار مع ملح البحر المقرمش.
                - generic [ref=e696]:
                  - generic [ref=e697]: نباتي
                  - generic [ref=e702]: نباتي صرف
                  - generic [ref=e708]: خالي من الجلوتين
              - generic [ref=e721]:
                - generic [ref=e722]: ١١٥ ج.م
                - generic [ref=e724]: 6 دقيقة
          - link "دجاج كاراغي ياباني الأكثر طلباً دجاج كاراغي ياباني قطع دجاج مقلية مرتين متبلة بالصويا والزنجبيل والثوم تُقدم مع الليمون ومايونيز اليوزو. ١٩٥ ج.م 12 دقيقة" [ref=e729] [cursor=pointer]:
            - /url: /menu/item/item-japanese-chicken-karaage
            - generic [ref=e730]:
              - img "دجاج كاراغي ياباني" [ref=e733]
              - generic [ref=e734]: الأكثر طلباً
            - generic [ref=e739]:
              - generic [ref=e740]:
                - heading "دجاج كاراغي ياباني" [level=3] [ref=e742]
                - paragraph [ref=e743]: قطع دجاج مقلية مرتين متبلة بالصويا والزنجبيل والثوم تُقدم مع الليمون ومايونيز اليوزو.
              - generic [ref=e744]:
                - generic [ref=e745]: ١٩٥ ج.م
                - generic [ref=e747]: 12 دقيقة
          - link "موتشي آيس كريم الأكثر طلباً موتشي آيس كريم ثلاث كرات من حلوى الموتشي الناعمة محشوة بآيس كريم الفراولة والماتشا والفانيليا. نباتي خالي من الجلوتين ١٥٥ ج.م 4 دقيقة" [ref=e752] [cursor=pointer]:
            - /url: /menu/item/item-mochi-ice-cream
            - generic [ref=e753]:
              - img "موتشي آيس كريم" [ref=e756]
              - generic [ref=e757]: الأكثر طلباً
            - generic [ref=e762]:
              - generic [ref=e763]:
                - heading "موتشي آيس كريم" [level=3] [ref=e765]
                - paragraph [ref=e766]: ثلاث كرات من حلوى الموتشي الناعمة محشوة بآيس كريم الفراولة والماتشا والفانيليا.
                - generic [ref=e767]:
                  - generic [ref=e768]: نباتي
                  - generic [ref=e773]: خالي من الجلوتين
              - generic [ref=e786]:
                - generic [ref=e787]: ١٥٥ ج.م
                - generic [ref=e789]: 4 دقيقة
          - link "ماتشا لاتيه الأكثر طلباً ماتشا لاتيه شاي ماتشا أخضر فاخر مخفوق يدوياً مع حليب كريمي، يُقدم ساخناً أو مثلجاً. نباتي خالي من الجلوتين ١٢٥ ج.م 5 دقيقة" [ref=e794] [cursor=pointer]:
            - /url: /menu/item/item-matcha-latte
            - generic [ref=e795]:
              - img "ماتشا لاتيه" [ref=e798]
              - generic [ref=e799]: الأكثر طلباً
            - generic [ref=e804]:
              - generic [ref=e805]:
                - heading "ماتشا لاتيه" [level=3] [ref=e807]
                - paragraph [ref=e808]: شاي ماتشا أخضر فاخر مخفوق يدوياً مع حليب كريمي، يُقدم ساخناً أو مثلجاً.
                - generic [ref=e809]:
                  - generic [ref=e810]: نباتي
                  - generic [ref=e815]: خالي من الجلوتين
              - generic [ref=e828]:
                - generic [ref=e829]: ١٢٥ ج.م
                - generic [ref=e831]: 5 دقيقة
          - link "حليب الفراولة الياباني الأكثر طلباً حليب الفراولة الياباني بيوريه الفراولة الطازجة المحضر منزلياً ممزوجاً بالحليب المثلج ورغوة الفانيليا. نباتي خالي من الجلوتين ١١٥ ج.م 5 دقيقة" [ref=e836] [cursor=pointer]:
            - /url: /menu/item/item-strawberry-milk
            - generic [ref=e837]:
              - img "حليب الفراولة الياباني" [ref=e840]
              - generic [ref=e841]: الأكثر طلباً
            - generic [ref=e846]:
              - generic [ref=e847]:
                - heading "حليب الفراولة الياباني" [level=3] [ref=e849]
                - paragraph [ref=e850]: بيوريه الفراولة الطازجة المحضر منزلياً ممزوجاً بالحليب المثلج ورغوة الفانيليا.
                - generic [ref=e851]:
                  - generic [ref=e852]: نباتي
                  - generic [ref=e857]: خالي من الجلوتين
              - generic [ref=e870]:
                - generic [ref=e871]: ١١٥ ج.م
                - generic [ref=e873]: 5 دقيقة
          - link "فيلادلفيا رول فيلادلفيا رول سلمون مدخن ناعم مع جبنة كريمية غنية وخيار مقرمش وسمسم أسود. خالي من الجلوتين ٢٦٥ ج.م 12 دقيقة" [ref=e878] [cursor=pointer]:
            - /url: /menu/item/item-philadelphia-roll
            - img "فيلادلفيا رول" [ref=e882]
            - generic [ref=e883]:
              - generic [ref=e884]:
                - heading "فيلادلفيا رول" [level=3] [ref=e886]
                - paragraph [ref=e887]: سلمون مدخن ناعم مع جبنة كريمية غنية وخيار مقرمش وسمسم أسود.
                - generic [ref=e888]: خالي من الجلوتين
              - generic [ref=e902]:
                - generic [ref=e903]: ٢٦٥ ج.م
                - generic [ref=e905]: 12 دقيقة
          - link "رينبو رول رينبو رول رول كاليفورنيا مغطى بشرائح متنوعة من السلمون والتونة والأسماك الطازجة والأفوكادو. خالي من الجلوتين ٣٦٠ ج.م 16 دقيقة" [ref=e910] [cursor=pointer]:
            - /url: /menu/item/item-rainbow-roll
            - img "رينبو رول" [ref=e914]
            - generic [ref=e915]:
              - generic [ref=e916]:
                - heading "رينبو رول" [level=3] [ref=e918]
                - paragraph [ref=e919]: رول كاليفورنيا مغطى بشرائح متنوعة من السلمون والتونة والأسماك الطازجة والأفوكادو.
                - generic [ref=e920]: خالي من الجلوتين
              - generic [ref=e934]:
                - generic [ref=e935]: ٣٦٠ ج.م
                - generic [ref=e937]: 16 دقيقة
          - link "تونة نيجيري تونة نيجيري تونة ماغورو حمراء طازجة فوق أرز السوشي المتبل مع لمسة خفيفة من الوسابي. خالي من الجلوتين ١٨٥ ج.م 8 دقيقة" [ref=e942] [cursor=pointer]:
            - /url: /menu/item/item-tuna-nigiri
            - img "تونة نيجيري" [ref=e946]
            - generic [ref=e947]:
              - generic [ref=e948]:
                - heading "تونة نيجيري" [level=3] [ref=e950]
                - paragraph [ref=e951]: تونة ماغورو حمراء طازجة فوق أرز السوشي المتبل مع لمسة خفيفة من الوسابي.
                - generic [ref=e952]: خالي من الجلوتين
              - generic [ref=e966]:
                - generic [ref=e967]: ١٨٥ ج.م
                - generic [ref=e969]: 8 دقيقة
          - link "روبيان نيجيري روبيان نيجيري روبيان إيبي مسلوق ومفتوح بشكل فراشة فوق أرز السوشي الياباني. خالي من الجلوتين ١٥٥ ج.م 8 دقيقة" [ref=e974] [cursor=pointer]:
            - /url: /menu/item/item-shrimp-nigiri
            - img "روبيان نيجيري" [ref=e978]
            - generic [ref=e979]:
              - generic [ref=e980]:
                - heading "روبيان نيجيري" [level=3] [ref=e982]
                - paragraph [ref=e983]: روبيان إيبي مسلوق ومفتوح بشكل فراشة فوق أرز السوشي الياباني.
                - generic [ref=e984]: خالي من الجلوتين
              - generic [ref=e998]:
                - generic [ref=e999]: ١٥٥ ج.م
                - generic [ref=e1001]: 8 دقيقة
          - link "تونة ساشيمي تونة ساشيمي شرائح سميكة من تونة الزعنفة الزرقاء الطازجة تُقدم باردة مع الوسابي. خالي من الجلوتين ٢٨٠ ج.م 8 دقيقة" [ref=e1006] [cursor=pointer]:
            - /url: /menu/item/item-tuna-sashimi
            - img "تونة ساشيمي" [ref=e1010]
            - generic [ref=e1011]:
              - generic [ref=e1012]:
                - heading "تونة ساشيمي" [level=3] [ref=e1014]
                - paragraph [ref=e1015]: شرائح سميكة من تونة الزعنفة الزرقاء الطازجة تُقدم باردة مع الوسابي.
                - generic [ref=e1016]: خالي من الجلوتين
              - generic [ref=e1030]:
                - generic [ref=e1031]: ٢٨٠ ج.م
                - generic [ref=e1033]: 8 دقيقة
          - link "شويو رامن بالدجاج شويو رامن بالدجاج مرق دجاج صافٍ بصلصة الصويا اليابانية مع دجاج مشوي مقرمش وبراعم الخيزران وبيض متبل. ٢٨٥ ج.م 16 دقيقة" [ref=e1038] [cursor=pointer]:
            - /url: /menu/item/item-chicken-shoyu-ramen
            - img "شويو رامن بالدجاج" [ref=e1042]
            - generic [ref=e1043]:
              - generic [ref=e1044]:
                - heading "شويو رامن بالدجاج" [level=3] [ref=e1046]
                - paragraph [ref=e1047]: مرق دجاج صافٍ بصلصة الصويا اليابانية مع دجاج مشوي مقرمش وبراعم الخيزران وبيض متبل.
              - generic [ref=e1048]:
                - generic [ref=e1049]: ٢٨٥ ج.م
                - generic [ref=e1051]: 16 دقيقة
          - link "ياكي أودون ياكي أودون نودلز أودون سميكة مقلية بالووك مع فطر الشيتاكي وبوك تشوي وملفوف بصلصة الصويا الداكنة. نباتي نباتي صرف ٢٤٥ ج.م 14 دقيقة" [ref=e1056] [cursor=pointer]:
            - /url: /menu/item/item-yaki-udon
            - img "ياكي أودون" [ref=e1060]
            - generic [ref=e1066]:
              - generic [ref=e1067]:
                - heading "ياكي أودون" [level=3] [ref=e1069]
                - paragraph [ref=e1070]: نودلز أودون سميكة مقلية بالووك مع فطر الشيتاكي وبوك تشوي وملفوف بصلصة الصويا الداكنة.
                - generic [ref=e1071]:
                  - generic [ref=e1072]: نباتي
                  - generic [ref=e1077]: نباتي صرف
              - generic [ref=e1083]:
                - generic [ref=e1084]: ٢٤٥ ج.م
                - generic [ref=e1086]: 14 دقيقة
          - link "رامن الخضروات رامن الخضروات مرق فطر الشيتاكي وكومبو العطري مع التوفو المقرمش وبوك تشوي وذرة حلوة. نباتي نباتي صرف ٢٣٥ ج.م 15 دقيقة" [ref=e1091] [cursor=pointer]:
            - /url: /menu/item/item-vegetable-ramen
            - img "رامن الخضروات" [ref=e1095]
            - generic [ref=e1096]:
              - generic [ref=e1097]:
                - heading "رامن الخضروات" [level=3] [ref=e1099]
                - paragraph [ref=e1100]: مرق فطر الشيتاكي وكومبو العطري مع التوفو المقرمش وبوك تشوي وذرة حلوة.
                - generic [ref=e1101]:
                  - generic [ref=e1102]: نباتي
                  - generic [ref=e1107]: نباتي صرف
              - generic [ref=e1113]:
                - generic [ref=e1114]: ٢٣٥ ج.م
                - generic [ref=e1116]: 15 دقيقة
          - link "طبق روبيان مقرمش طبق روبيان مقرمش روبيان تمبورا ذهبي مقرمش فوق أرز دافئ مع صلصة تينتسويو الحلوة ومايونيز حار. ٣١٥ ج.م 15 دقيقة" [ref=e1121] [cursor=pointer]:
            - /url: /menu/item/item-crispy-shrimp-bowl
            - img "طبق روبيان مقرمش" [ref=e1125]
            - generic [ref=e1131]:
              - generic [ref=e1132]:
                - heading "طبق روبيان مقرمش" [level=3] [ref=e1134]
                - paragraph [ref=e1135]: روبيان تمبورا ذهبي مقرمش فوق أرز دافئ مع صلصة تينتسويو الحلوة ومايونيز حار.
              - generic [ref=e1136]:
                - generic [ref=e1137]: ٣١٥ ج.م
                - generic [ref=e1139]: 15 دقيقة
          - link "بيف دونبوري بيف دونبوري شرائح لحم رفيعة مطهوة مع بصل مكرمل في مرق الداشي والصويا فوق أرز ياباني دافئ. ٣٤٥ ج.م 16 دقيقة" [ref=e1144] [cursor=pointer]:
            - /url: /menu/item/item-beef-donburi
            - img "بيف دونبوري" [ref=e1148]
            - generic [ref=e1149]:
              - generic [ref=e1150]:
                - heading "بيف دونبوري" [level=3] [ref=e1152]
                - paragraph [ref=e1153]: شرائح لحم رفيعة مطهوة مع بصل مكرمل في مرق الداشي والصويا فوق أرز ياباني دافئ.
              - generic [ref=e1154]:
                - generic [ref=e1155]: ٣٤٥ ج.م
                - generic [ref=e1157]: 16 دقيقة
          - link "روبيان تمبورا روبيان تمبورا خمس حبات روبيان جامبو بعجينة التمبورا الهشة المقرمشة مع صلصة التينتسويو. ٢٤٥ ج.م 12 دقيقة" [ref=e1162] [cursor=pointer]:
            - /url: /menu/item/item-shrimp-tempura
            - img "روبيان تمبورا" [ref=e1166]
            - generic [ref=e1167]:
              - generic [ref=e1168]:
                - heading "روبيان تمبورا" [level=3] [ref=e1170]
                - paragraph [ref=e1171]: خمس حبات روبيان جامبو بعجينة التمبورا الهشة المقرمشة مع صلصة التينتسويو.
              - generic [ref=e1172]:
                - generic [ref=e1173]: ٢٤٥ ج.م
                - generic [ref=e1175]: 12 دقيقة
          - link "بانكيك سوفليه ياباني بانكيك سوفليه ياباني بانكيك السوفليه الياباني الهش يُقدم دافئاً مع الكريمة والفراولة الطازجة وشراب القيقب. نباتي ١٨٥ ج.م 15 دقيقة" [ref=e1180] [cursor=pointer]:
            - /url: /menu/item/item-japanese-pancakes
            - img "بانكيك سوفليه ياباني" [ref=e1184]
            - generic [ref=e1185]:
              - generic [ref=e1186]:
                - heading "بانكيك سوفليه ياباني" [level=3] [ref=e1188]
                - paragraph [ref=e1189]: بانكيك السوفليه الياباني الهش يُقدم دافئاً مع الكريمة والفراولة الطازجة وشراب القيقب.
                - generic [ref=e1190]: نباتي
              - generic [ref=e1196]:
                - generic [ref=e1197]: ١٨٥ ج.م
                - generic [ref=e1199]: 15 دقيقة
          - link "شاي ياباني مثلج شاي ياباني مثلج شاي سينشا الأخضر المنقوع على البارد مع نكهة الخوخ الأبيض واليوزو المنعش. نباتي نباتي صرف خالي من الجلوتين ٩٥ ج.م 3 دقيقة" [ref=e1204] [cursor=pointer]:
            - /url: /menu/item/item-japanese-iced-tea
            - img "شاي ياباني مثلج" [ref=e1208]
            - generic [ref=e1209]:
              - generic [ref=e1210]:
                - heading "شاي ياباني مثلج" [level=3] [ref=e1212]
                - paragraph [ref=e1213]: شاي سينشا الأخضر المنقوع على البارد مع نكهة الخوخ الأبيض واليوزو المنعش.
                - generic [ref=e1214]:
                  - generic [ref=e1215]: نباتي
                  - generic [ref=e1220]: نباتي صرف
                  - generic [ref=e1226]: خالي من الجلوتين
              - generic [ref=e1239]:
                - generic [ref=e1240]: ٩٥ ج.م
                - generic [ref=e1242]: 3 دقيقة
          - link "مشروبات غازية وراموني مشروبات غازية وراموني صودا راموني اليابانية المثلجة أو مشروبات غازية كلاسيكية منعشة. نباتي نباتي صرف خالي من الجلوتين ٧٥ ج.م 2 دقيقة" [ref=e1247] [cursor=pointer]:
            - /url: /menu/item/item-soft-drinks
            - img "مشروبات غازية وراموني" [ref=e1251]
            - generic [ref=e1252]:
              - generic [ref=e1253]:
                - heading "مشروبات غازية وراموني" [level=3] [ref=e1255]
                - paragraph [ref=e1256]: صودا راموني اليابانية المثلجة أو مشروبات غازية كلاسيكية منعشة.
                - generic [ref=e1257]:
                  - generic [ref=e1258]: نباتي
                  - generic [ref=e1263]: نباتي صرف
                  - generic [ref=e1269]: خالي من الجلوتين
              - generic [ref=e1282]:
                - generic [ref=e1283]: ٧٥ ج.م
                - generic [ref=e1285]: 2 دقيقة
      - generic [ref=e1291]:
        - generic [ref=e1292]:
          - heading "زورونا في Lolacat><" [level=2] [ref=e1293]
          - paragraph [ref=e1294]: مطبخ ياباني عصري للسوشي والرامن والنودلز مستوحى من شوارع طوكيو وروح الضيافة اللطيفة.
        - generic [ref=e1295]:
          - generic [ref=e1296]:
            - heading "ساعات العمل" [level=3] [ref=e1301]
            - generic [ref=e1302]:
              - generic [ref=e1303]:
                - term [ref=e1304]: الإثنين
                - definition [ref=e1305]: 12:00 – 23:30
              - generic [ref=e1306]:
                - term [ref=e1307]: الثلاثاء
                - definition [ref=e1308]: 12:00 – 23:30
              - generic [ref=e1309]:
                - term [ref=e1310]: الأربعاء
                - definition [ref=e1311]: 12:00 – 23:30
              - generic [ref=e1312]:
                - term [ref=e1313]: الخميس
                - definition [ref=e1314]: 12:00 – 00:30
              - generic [ref=e1315]:
                - term [ref=e1316]: الجمعة
                - definition [ref=e1317]: 13:00 – 01:00
              - generic [ref=e1318]:
                - term [ref=e1319]: السبت
                - definition [ref=e1320]: 12:00 – 01:00
              - generic [ref=e1321]:
                - term [ref=e1322]: الأحد
                - definition [ref=e1323]: 12:00 – 23:30
          - generic [ref=e1324]:
            - generic [ref=e1325]:
              - heading "التواصل والعنوان" [level=3] [ref=e1326]
              - list [ref=e1327]:
                - listitem [ref=e1328]:
                  - generic [ref=e1332]: ١٤ شارع الجزيرة، الزمالك، القاهرة، مصر
                - listitem [ref=e1333]:
                  - link "+20 100 778 4420" [ref=e1336] [cursor=pointer]:
                    - /url: tel:+20 100 778 4420
                - listitem [ref=e1337]:
                  - link "hello@lolacat.kitchen" [ref=e1341] [cursor=pointer]:
                    - /url: mailto:hello@lolacat.kitchen
            - generic [ref=e1342]:
              - paragraph [ref=e1343]: تابعونا
              - generic [ref=e1344]:
                - link "Instagram" [ref=e1345] [cursor=pointer]:
                  - /url: https://instagram.com/lolacat.kitchen
                - link "Website" [ref=e1350] [cursor=pointer]:
                  - /url: https://lolacat.kitchen
  - contentinfo [ref=e1355]:
    - generic [ref=e1356]:
      - generic [ref=e1357]:
        - generic [ref=e1358]:
          - generic [ref=e1359]: Lolacat><
          - paragraph [ref=e1369]: لقيمات صغيرة.. سعادة كبيرة.
          - paragraph [ref=e1370]: مطبخ ياباني عصري للسوشي والرامن والنودلز مستوحى من شوارع طوكيو وروح الضيافة اللطيفة.
        - generic [ref=e1371]:
          - heading "التواصل والعنوان" [level=3] [ref=e1372]
          - list [ref=e1373]:
            - listitem [ref=e1374]:
              - generic [ref=e1378]: ١٤ شارع الجزيرة، الزمالك، القاهرة، مصر
            - listitem [ref=e1379]:
              - link "+20 100 778 4420" [ref=e1382] [cursor=pointer]:
                - /url: tel:+20 100 778 4420
            - listitem [ref=e1383]:
              - link "hello@lolacat.kitchen" [ref=e1387] [cursor=pointer]:
                - /url: mailto:hello@lolacat.kitchen
        - generic [ref=e1388]:
          - heading "القائمة" [level=3] [ref=e1389]
          - generic [ref=e1390]:
            - link "تصفح القائمة الكاملة" [ref=e1391] [cursor=pointer]:
              - /url: /
            - link "لفائف السوشي" [ref=e1392] [cursor=pointer]:
              - /url: /menu/category/cat-sushi-rolls
            - link "رامن ونودلز" [ref=e1393] [cursor=pointer]:
              - /url: /menu/category/cat-ramen-noodles
            - link "لوحة التحكم" [ref=e1394] [cursor=pointer]:
              - /url: /admin
          - generic [ref=e1395]:
            - link "Instagram" [ref=e1396] [cursor=pointer]:
              - /url: https://instagram.com/lolacat.kitchen
            - link "Website" [ref=e1400] [cursor=pointer]:
              - /url: https://lolacat.kitchen
      - generic [ref=e1404]:
        - paragraph [ref=e1405]: © 2026 Lolacat>< مطبخ السوشي والنودلز الياباني. جميع الحقوق محفوظة.
        - paragraph [ref=e1406]: "وضع العرض التجريبي: يتم حفظ التغييرات محلياً في متصفحك."
```

# Test source

```ts
  1   | import fs from "node:fs";
  2   | import { expect, test } from "@playwright/test";
  3   | import jsQR from "jsqr";
  4   | import { PNG } from "pngjs";
  5   | 
  6   | test.describe("Lolacat>< Complete Digital Menu E2E", () => {
  7   |   test("splash -> Arabic RTL -> category -> search -> details -> admin CRUD -> QR download & decode", async ({
  8   |     page,
  9   |   }) => {
  10  |     // 1. Open the application
  11  |     await page.goto("/");
  12  | 
  13  |     // 2. See the noodle bowl splash screen
  14  |     const splash = page.getByTestId("noodle-splash-screen");
  15  |     await expect(splash).toBeVisible();
  16  |     await expect(page.getByAltText("Lolacat>< ramen noodle bowl")).toBeVisible();
  17  | 
  18  |     // 3. Enter the public menu (wait for auto-transition or click enter)
  19  |     await expect(splash).toBeHidden({ timeout: 5000 });
  20  |     await expect(page.getByRole("heading", { name: /Little bites\. Big happiness\./i })).toBeVisible();
  21  | 
  22  |     // 4. Switch to Arabic
  23  |     await page.getByTestId("lang-btn-ar").click();
  24  | 
  25  |     // 5. Verify RTL layout
  26  |     await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  27  |     await expect(page.locator("html")).toHaveAttribute("lang", "ar");
> 28  |     await expect(page.getByText("لقيمات صغيرة.. سعادة كبيرة.")).toBeVisible();
      |                                                                 ^ Error: expect(locator).toBeVisible() failed
  29  | 
  30  |     // Switch back to EN or continue in Arabic (test Sushi Rolls in Arabic!)
  31  |     // 6. Open Sushi Rolls
  32  |     await page.getByTestId("category-card-sushi-rolls").click();
  33  |     await expect(page).toHaveURL(/\/menu\/category\/cat-sushi-rolls/);
  34  |     await expect(page.getByRole("heading", { name: "لفائف السوشي" })).toBeVisible();
  35  | 
  36  |     // 7. Search for a dish (bilingual search works in either language!)
  37  |     await page.getByTestId("menu-search-input").fill("Dragon");
  38  |     await expect(page.getByTestId("menu-item-card-dragon-roll")).toBeVisible();
  39  | 
  40  |     // 8. Open item details
  41  |     await page.getByTestId("menu-item-card-dragon-roll").click();
  42  |     await expect(page).toHaveURL(/\/menu\/item\/item-dragon-roll/);
  43  |     await expect(page.getByRole("heading", { name: "دراجون رول" })).toBeVisible();
  44  | 
  45  |     // 9. Return to the main menu
  46  |     await page.getByRole("link", { name: "تصفح القائمة الكاملة" }).click();
  47  |     await expect(page).toHaveURL(/\/$/);
  48  | 
  49  |     // Switch back to EN for English admin assertions
  50  |     await page.getByTestId("lang-btn-en").click();
  51  |     await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  52  | 
  53  |     // 10. Open admin dashboard
  54  |     await page.goto("/admin");
  55  |     await expect(page.getByRole("heading", { name: "Dashboard Overview" })).toBeVisible();
  56  | 
  57  |     // 11. Add a new dish
  58  |     await page.goto("/admin/items");
  59  |     await page.getByTestId("add-item-btn").click();
  60  |     await page.locator('input[name="nameEn"]').fill("Kawaii Miso Roll");
  61  |     await page.locator('input[name="nameAr"]').fill("رول ميسو كاواي");
  62  |     await page.locator('textarea[name="descEn"]').fill("Rich miso-glazed salmon roll.");
  63  |     await page.locator('textarea[name="descAr"]').fill("رول سلمون بصلصة الميسو الغنية.");
  64  |     await page.locator('input[name="ingredientsEn"]').fill("Salmon, Miso Glaze, Rice");
  65  |     await page.locator('input[name="ingredientsAr"]').fill("سلمون، ميسو، أرز");
  66  |     await page.getByTestId("save-item-btn").click();
  67  | 
  68  |     await expect(page.getByTestId("admin-item-row-kawaii-miso-roll")).toBeVisible();
  69  | 
  70  |     // 12. Verify it appears in the public menu
  71  |     await page.goto("/");
  72  |     const publicCard = page.getByTestId("menu-item-card-kawaii-miso-roll");
  73  |     await expect(publicCard).toBeVisible();
  74  |     await expect(publicCard).not.toContainText("Currently Unavailable");
  75  | 
  76  |     // 13. Change its availability
  77  |     await page.goto("/admin/items");
  78  |     await page.locator('[data-testid="toggle-avail-kawaii-miso-roll"]:visible').first().click();
  79  | 
  80  |     // 14. Verify it is no longer available to customers
  81  |     await page.goto("/");
  82  |     const updatedCard = page.getByTestId("menu-item-card-kawaii-miso-roll");
  83  |     await expect(updatedCard).toContainText("Currently Unavailable");
  84  | 
  85  |     // 15. Generate a QR code
  86  |     await page.goto("/admin/qr-code");
  87  |     await expect(page.getByTestId("qr-canvas-wrapper")).toBeVisible();
  88  |     const expectedOriginUrl = `${new URL(page.url()).origin}/`;
  89  |     await expect(page.getByTestId("qr-url-input")).toHaveValue(expectedOriginUrl);
  90  | 
  91  |     // 16. Download the QR code
  92  |     const downloadPromise = page.waitForEvent("download");
  93  |     await page.getByTestId("download-qr-png").click();
  94  |     const download = await downloadPromise;
  95  |     const downloadPath = await download.path();
  96  |     expect(downloadPath).toBeTruthy();
  97  | 
  98  |     // 17. Verify the generated QR contains the correct public URL
  99  |     const buffer = fs.readFileSync(downloadPath!);
  100 |     const png = PNG.sync.read(buffer);
  101 |     const decoded = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  102 |     expect(decoded?.data).toBe(expectedOriginUrl);
  103 |   });
  104 | 
  105 |   test("responsive layout has zero horizontal overflow across required viewports", async ({
  106 |     page,
  107 |   }) => {
  108 |     await page.addInitScript(() => {
  109 |       window.sessionStorage.setItem("lolacat_splash_seen_v1", "1");
  110 |     });
  111 | 
  112 |     for (const width of [360, 390, 768, 1024, 1440]) {
  113 |       await page.setViewportSize({ width, height: 844 });
  114 |       await page.goto("/");
  115 |       await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  116 |       const hasOverflow = await page.evaluate(
  117 |         () => document.documentElement.scrollWidth > window.innerWidth + 1,
  118 |       );
  119 |       expect(hasOverflow, `Horizontal overflow at width ${width}px`).toBe(false);
  120 |     }
  121 |   });
  122 | });
  123 | 
```