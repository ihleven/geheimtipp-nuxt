<template>
    <div class="geheimtipp-wrapper">
        <div class="container">
            <nav class="navbar navbar-expand-md navbar-dark top-nav justify-content-end">
                <div class="container justify-content-end">
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div id="navbarSupportedContent" class="collapse navbar-collapse">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <n-link class="nav-link" to="/"></n-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dropdown">
                    <button
                        id="authMenu"
                        type="button"
                        class="btn btn-outline-light dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style="border-color: transparent;"
                    >
                        <i class="fa fa-fw" :class="auth.account ? 'fa-user-o' : 'fa-user-secret'"></i>u: {{ auth.account.username }}
                        <i class="fa fa-angle-down"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="authMenu">
                        <h6 class="dropdown-header">{{ auth.account.first_name }} {{ auth.account.last_name }}</h6>
                        <!--<a class="dropdown-item" href routerLink="/settings">Einstellungen</a>
                        <button class="dropdown-item" type="button">Profilseite</button>-->
                        <div class="dropdown-divider"></div>
                        <h6 class="dropdown-header">
                            Bundesliga 2018/19
                        </h6>
                        <n-link class="dropdown-item" href to="/2019/register">
                            <i class="fa fa-fw fa-registered"></i>
                            Registration
                        </n-link>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item" type="button" @click="logout()">
                            <i class="fa fa-fw fa-power-off"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </div>
        <!-- container d-flex flex-wrap justify-content-between align-items-start -->

        <div class="container splash">
            <div class="row justify-content-between">
                <div class="col-md yanone">
                    <div id="animationWrapper">
                        <n-link to="/geheimtipp/2019">
                            <span class="span1">ihleven.de</span>
                            <span class="span2">Geheim</span>
                            <span class="span3">Tipp</span>
                            <span class="span4">{{ subtitle }}</span>
                        </n-link>
                    </div>
                </div>

                <quote-box class="col-md"></quote-box>
            </div>
            <!--
        <div class="row">
            <div class="alert alert-info">
                <i class="fa fa-warning"></i>
                Ab dem Achtelfinale werden alle Spiele bis einschließlich einer möglichen Verlängerung getippt. d.h. es kann auch weiterhin Unentschieden getippt werden. Ein eventuelles Elfmeterschießen wird nicht gewertet.
            </div>
        
        </div>
        --></div>

        <div class="main">
            <!-- <router-outlet class="frame"></router-outlet> -->
            <nuxt-child class="frame" />
        </div>

        <footer class="pt-4 my-md-5 pt-md-5 border-top footer">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md">
                        <img class="mb-2" src="~assets/logos/geheimtipplogo.png" alt="geheitmipp" width="64" height="64" />
                        <small class="d-block mb-3 text-muted">&copy; 2003-2018</small>
                    </div>
                    <div class="col-6 col-md">
                        <h5>Ausgaben</h5>
                        <ul class="list-unstyled text-small">
                            <li><n-link class="" to="./2019">Bundesliga 2018/19</n-link></li>
                            <li><a class="text-muted disabled" routerLink="/2018">Bundesliga 2017/18</a></li>
                            <li><a class="text-muted disabled" routerLink="/2017">Bundesliga 2016/17</a></li>
                            <li><a class="text-muted disabled" routerLink="/2016">Bundesliga 2015/16</a></li>
                            <li><a class="text-muted disabled" routerLink="/2015">Bundesliga 2014/15</a></li>
                            <li><a class="text-muted disabled" routerLink="/2014">Bundesliga 2013/14</a></li>
                            <li><a class="text-muted disabled" routerLink="/2013">Bundesliga 2012/13</a></li>
                            <li><a class="text-muted disabled" routerLink="/2012">Bundesliga 2011/12</a></li>
                            <li><a class="text-muted disabled" routerLink="/2011">Bundesliga 2010/11</a></li>
                            <li><a class="text-muted disabled" routerLink="/2010">Bundesliga 2009/10</a></li>
                            <li><a class="text-muted disabled" routerLink="/2009">BL 2008/09</a></li>
                            <li><a class="text-muted disabled" routerLink="/2008">BL 2007/08</a></li>
                            <li><a class="text-muted disabled" routerLink="/2006">BL 2005/06</a></li>
                            <li><a class="text-muted disabled" routerLink="/2005">BL 2004/05</a></li>
                            <li><a class="text-muted disabled" routerLink="/2004">BL 2003/04</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-md">
                        <h5>Turniere</h5>
                        <ul class="list-unstyled text-small">
                            <li><a class="text-muted" routerLink="/WM2018">World Cup 2018</a></li>
                            <li><a class="text-muted" routerLink="/EM2016">Euro 2016</a></li>
                            <li><a class="text-muted" routerLink="/WM2014">World Cup 2014</a></li>
                            <li><a class="text-muted" routerLink="/EM2012">Euro 2012</a></li>
                            <li><a class="text-muted" routerLink="/WM2010">World Cup 2010</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-md">
                        <h5>About</h5>
                        <ul class="list-unstyled text-small">
                            <li><a class="text-muted disabled" routerLink="/datenschutz">Datenschutz</a></li>
                            <li><a class="text-muted disabled" routerLink="/impressum">Impressum</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import Citatron from '@/components/Citatron'
export default {
    components: {
        QuoteBox: Citatron,
    },
    data() {
        return {
            subtitle: 'Bundesliga 2018/19',
            ausgaben: ['WM2018', '2014'],
            auth: {
                account: {
                    first_name: 'ih',
                    last_name: 'leven',
                },
            },
        }
    },
    methods: {
        logout() {
            this.auth.logout()
        },
    },
}
</script>

<style>
a.disabled {
    pointer-events: none;
    cursor: default;
}

[hidden] {
    display: none !important;
}
.dropdown-toggle::after {
    display: none;
}
.geheimtipp-wrapper {
    border: 0px solid red;
    background: url('~assets/bg/lg/Rasen_30Prozent.jpg') no-repeat;
    background-size: 100%;
}
.splash {
    min-height: 250px;
    margin-bottom: 0;
}
.frame {
    border: 0px solid blue;
}
.footer {
    margin-top: 0 !important;
    background: #e8e8e8;
}
.top-nav {
    background: rgba(255, 255, 255, 0);
    /*box-shadow: 2px 4px 5px 0 rgba(0, 0, 0, 0.2);*/
}
.jumbotron {
    position: relative;
    top: 50%;
    opacity: 0.85;
    border-color: RGB(50, 50, 50);
    padding: 1rem;
}
</style>
