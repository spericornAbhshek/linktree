<?php defined('ALTUMCODE') || die() ?>

<body class="link-body <?= $data->link->design->background_class ?>" style="<?= $data->link->design->background_style ?>">
    <div class="container animated fadeIn">
        <div class="row d-flex justify-content-center text-center">
            <div class="col-md-8 link-content <?= isset($_GET['preview']) ? 'container-disabled-simple' : null ?>">

                <?php require THEME_PATH . 'views/partials/ads_header_biolink.php' ?>

                <header class="d-flex flex-column align-items-center" style="<?= $data->link->design->text_style ?>">
                    <img id="image" src="<?= SITE_URL . UPLOADS_URL_PATH . 'avatars/' . $data->link->settings->image ?>" alt="<?= \Altum\Language::get()->link->biolink->image_alt ?>" class="link-image" <?= !empty($data->link->settings->image) && file_exists(UPLOADS_PATH . 'avatars/' . $data->link->settings->image) ? null : 'style="display: none;"' ?> />

                    <div class="d-flex flex-row align-items-center mt-4">
                        <h1 id="title"><?= $data->link->settings->title ?></h1>

                        <?php if($data->user->plan_settings->verified && $data->link->settings->display_verified): ?>
                        <span data-toggle="tooltip" title="<?= \Altum\Language::get()->global->verified ?>" class="link-verified ml-1"><i class="fa fa-fw fa-check-circle fa-1x"></i></span>
                        <?php endif ?>
                    </div>

                    <p id="description"><?= $data->link->settings->description ?></p>
                </header>

                <main id="links" class="mt-4">


                
                    <?php if($data->links): ?>
                        <?php foreach($data->links as $row): ?>

                            <?php

                            /* Check if its a scheduled link and we should show it or not */
                            if(
                                    !empty($row->start_date) &&
                                    !empty($row->end_date) &&
                                    (
                                        \Altum\Date::get('', null) < \Altum\Date::get($row->start_date, null, \Altum\Date::$default_timezone) ||
                                        \Altum\Date::get('', null) > \Altum\Date::get($row->end_date, null, \Altum\Date::$default_timezone)
                                    )
                            ) {
                                continue;
                            }

                            /* Check if the user has permissions to use the link */
                            if(in_array($row->subtype, ['soundcloud', 'spotify']) && !$data->user->plan_settings->music_embeds) {
                                continue;
                            }

                            /* Check if the user has permissions to use the link */
                            if(in_array($row->subtype, ['youtube', 'vimeo', 'twitch', 'tiktok']) && !$data->user->plan_settings->video_embeds) {
                                continue;
                            }

                            $row->utm = $data->link->settings->utm;

                            ?>

                            <div data-link-id="<?= $row->link_id ?>">
                                <?= \Altum\Link::get_biolink_link($row, $data->user) ?? null ?>
                            </div>

                        <?php endforeach ?>
                    <?php endif ?>
                    <?php 
                    $display = "display:none !important;";
                    if(property_exists($data->link->settings, 'experience')){ 
                   
                      if($data->link->settings->experience->company !=  ""){
                          $display = "display:flex !important";
                      }}?>
                    <div  class="d-flex flex-wrap edu_exp experience_div"  style="<?php echo $display; ?> border-top: 1px solid rgb(192 181 181 / 75%); box-shadow: rgb(198 173 173 / 62%) 0px -1px 0px; <?= $data->link->design->text_style ?>">
                   
                           <h6 id="exp" class="margin-top_3">EXPERIENCE</h6>
                           <table style="width: 100%; text-align: left; border-collapse: separate;border-spacing: 0 0.6em;" id="exp_table" >
                           <?php 
                    if(property_exists($data->link->settings, 'experience')){ 
                   
                      if($data->link->settings->experience->company !=  ""){ ?>
                           <?php   for($i = 0; $i < count($data->link->settings->experience->company); $i++){
                                   ?>
                               
                                   <tr style="text-align: left;">
                                       <td><span class="text-uppercase experience_company<?php echo $i; ?>" ><?= $data->link->settings->experience->company[$i] ?? '' ?></span><br><small class="text-capitalize exp_position<?php echo $i; ?>"><?= $data->link->settings->experience->position[$i] ?? '' ?></small></td>
                                       <!-- <td colspan="1"></td> -->
                                       <td style=" text-align: end; padding: 0 0 24px 0; "><small class="expYear<?php echo $i; ?>"><?= $data->link->settings->experience->start[$i] ?? '' ?></small></td>
                                    </tr>
                               
                                
                                   
                            <?php }  } } ?>
                            </table>
                            </div>  
                            
                            <br> 
                            <?php 
                    $display_edu = "display:none !important;";
                    if(property_exists($data->link->settings, 'education')){ 
                   
                      if($data->link->settings->education->course !=  ""){
                          $display_edu = "display:flex !important";
                      }}?>
                            <div  class="d-flex flex-wrap  edu_exp education_div"  style="<?php echo $display_edu; ?> border-top: 1px solid rgb(192 181 181 / 75%); box-shadow: rgb(198 173 173 / 62%) 0px -1px 0px; <?= $data->link->design->text_style ?>">
                           
                            <h6 class="margin-top_3">EDUCATION</h6>
                            <table style="width: 100%; text-align: left; border-collapse: separate;border-spacing: 0 0.6em;" id="edu_table">
                         <?php if(property_exists($data->link->settings, 'education')){ 
                          if($data->link->settings->education->course !=  ""){  ?> 
                           <?php
                                for($i = 0; $i < count($data->link->settings->education->course); $i++){
                                   
                                ?>
                                <tr style="text-align: left;">
                                       <td ><span class="text-uppercase education_course<?php echo $i; ?>"><?= $data->link->settings->education->course[$i] ?? '' ?></span> <br><small class="text-capitalize university_text<?php echo $i; ?>"><?= $data->link->settings->education->univ[$i] ?? '' ?></small></td>
                                       <!-- <td colspan="1"></td> -->
                                       <td style=" text-align: end; padding: 0 0 24px 0; "><small class="eduYear<?php echo $i; ?>"><?= $data->link->settings->education->year[$i] ?? '' ?></small></td>
                                    </tr>
                               
                                
                                   
                            <?php }  } }  ?>
                            </table>
                            </div>
                            <br> 
                            <?php 
                    $display_skills = "display:none !important;";
                    if(property_exists($data->link->settings, 'skillset')){ 
                   
                      if($data->link->settings->skillset !=  ""){
                          $display_skills = "display:flex !important";
                      }}?>
                            <div class="text-left skillsets_div" id="skillsets" style="<?php echo $display_skills; ?> border-top: 1px solid rgb(192 181 181 / 75%); box-shadow: rgb(198 173 173 / 62%) 0px -1px 0px; line-height: 2; <?= $data->link->design->text_style ?>">
                            <h6 class="margin-top_3">SKILLS</h6>
                          
                            <div class="skills_container">
                            <?php 
                            if(property_exists($data->link->settings, 'skillset')){ 
                            if($data->link->settings->skillset !=""){
                                $skills = explode(',',$data->link->settings->skillset);
                                foreach($skills as $skill){ ?>
                                    <span class="text-capitalize <?php echo $skill; ?>" style=" border: solid 1px; border-radius: 5px; line-height: 2; ">&nbsp;<?php echo $skill; ?>&nbsp;</span>
                               <?php }
                            }}?>
                            </div>
                           </div> 
                                       
                                   
                               
                            
                            
                    <?php if($data->user->plan_settings->socials): ?>
                    <div id="socials" class="d-flex flex-wrap justify-content-center mt-5">

                    <?php $biolink_socials = require APP_PATH . 'includes/biolink_socials.php'; ?>
                    <?php foreach($data->link->settings->socials as $key => $value): ?>
                        <?php if($value): ?>

                        <div class="mx-3 mb-3" >
                            <span >
                                <a href="<?= sprintf($biolink_socials[$key]['format'], $value) ?>" target="_blank">
                                    <i
                                        data-toggle="tooltip"
                                        title="<?= \Altum\Language::get()->link->settings->socials->{$key}->name ?>"
                                        class="<?= \Altum\Language::get()->link->settings->socials->{$key}->icon ?> fa-fw fa-2x"
                                        style="<?= $data->link->design->socials_style ?>">
                                    </i>
                                </a>
                            </span>
                        </div>

                        <?php endif ?>
                    <?php endforeach ?>

                    </div>
                    <?php endif ?>

                </main>

                <?php require THEME_PATH . 'views/partials/ads_footer_biolink.php' ?>
                       
                <footer class="link-footer">
                 
                    <?php if($data->link->settings->display_branding): ?>
                        <?php if(isset($data->link->settings->branding, $data->link->settings->branding->name, $data->link->settings->branding->url) && !empty($data->link->settings->branding->name)): ?>
                            <a id="branding" href="<?= !empty($data->link->settings->branding->url) ? $data->link->settings->branding->url : '#' ?>" style="<?= $data->link->design->text_style ?>"><?= $data->link->settings->branding->name ?></a>
                        <?php else: ?>
                            <a id="branding" href="<?= url() ?>" style="<?= $data->link->design->text_style ?>"><?= \Altum\Language::get()->link->branding ?></a>
                        <?php endif ?>
                    <?php endif ?>
                </footer>

            </div>
        </div>
    </div>

    <?= \Altum\Event::get_content('modals') ?>
</body>

<?php ob_start() ?>
<script>
    /* Internal tracking for biolink links */
    $('[data-location-url]').on('click', event => {

        let base_url = $('[name="url"]').val();
        let url = $(event.currentTarget).data('location-url');

        $.ajax(`${base_url}${url}?no_redirect`);
    });
</script>
<?php \Altum\Event::add_content(ob_get_clean(), 'javascript') ?>

<?php ob_start() ?>
<script>
    /* Go over all mail buttons to make sure the user can still submit mail */
    $('form[id^="mail_"]').each((index, element) => {
        let link_id = $(element).find('input[name="link_id"]').val();
        let is_converted = localStorage.getItem(`mail_${link_id}`);

        if(is_converted) {
            /* Set the submit button to disabled */
            $(element).find('button[type="submit"]').attr('disabled', 'disabled');
        }
    });
        /* Form handling for mail submissions if any */
    $('form[id^="mail_"]').on('submit', event => {
        let base_url = $('[name="url"]').val();
        let link_id = $(event.currentTarget).find('input[name="link_id"]').val();
        let is_converted = localStorage.getItem(`mail_${link_id}`);

        if(!is_converted) {

            $.ajax({
                type: 'POST',
                url: `${base_url}link-ajax`,
                data: $(event.currentTarget).serialize(),
                success: (data) => {
                    let notification_container = $(event.currentTarget).find('.notification-container');

                    if (data.status == 'error') {
                        notification_container.html('');

                        display_notifications(data.message, 'error', notification_container);
                    } else if (data.status == 'success') {

                        display_notifications(data.message, 'success', notification_container);

                        setTimeout(() => {

                            /* Hide modal */
                            $(event.currentTarget).closest('.modal').modal('hide');

                            /* Remove the notification */
                            notification_container.html('');

                            /* Set the localstorage to mention that the user was converted */
                            localStorage.setItem(`mail_${link_id}`, true);

                            /* Set the submit button to disabled */
                            $(event.currentTarget).find('button[type="submit"]').attr('disabled', 'disabled');

                        }, 1000);

                    }
                },
                dataType: 'json'
            });

        }

        event.preventDefault();
    })
</script>
<?php \Altum\Event::add_content(ob_get_clean(), 'javascript') ?>

<?php if($data->user->plan_settings->google_analytics && !empty($data->link->settings->google_analytics)): ?>
    <?php ob_start() ?>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?= $data->link->settings->google_analytics ?>"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '<?= $data->link->settings->google_analytics ?>');
    </script>

    <?php \Altum\Event::add_content(ob_get_clean(), 'head') ?>
<?php endif ?>

<?php if($data->user->plan_settings->facebook_pixel && !empty($data->link->settings->facebook_pixel)): ?>
    <?php ob_start() ?>

    <!-- Facebook Pixel Code -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '<?= $data->link->settings->facebook_pixel ?>');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=<?= $data->link->settings->facebook_pixel ?>&ev=PageView&noscript=1"/></noscript>
    <!-- End Facebook Pixel Code -->

    <?php \Altum\Event::add_content(ob_get_clean(), 'head') ?>
<?php endif ?>

