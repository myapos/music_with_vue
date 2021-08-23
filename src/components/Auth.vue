<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    id="modal"
    :class="{ hidden: !authModalShow }"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center
      sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div
              class="modal-close cursor-pointer z-50"
              @click.prevent="toggleAuthModal"
            >
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition hover:text-blue-400"
                href="#"
                @click.prevent="tab = 'login'"
                :class="{
                  'hover: text-white text-white bg-blue-600': tab === 'login',
                  'hover: text-blue-600': tab === 'register',
                }"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition hover:text-blue-400"
                href="#"
                @click.prevent="tab = 'register'"
                :class="{
                  'hover: text-white text-white bg-blue-600':
                    tab === 'register',
                  'hover: text-blue-600': tab === 'login',
                }"
                >Register</a
              >
            </li>
          </ul>

          <app-login-form v-if="tab === 'login'" />
          <app-register-form v-else />
        </div>
      </div>
    </div></div
></template>

<script>
import { mapMutations, mapState } from "vuex";
import AppRegisterForm from "./RegisterForm.vue";
import AppLoginForm from "./LoginForm.vue";

// ...mapGetters(["authModalShow"]),
export default {
  name: "Auth",
  data() {
    return {
      tab: "login",
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required||min:3|max:100|email",
        age: "required|min_value:18|max_value:100",
        password: "required|min:3|max:100",
        confirm_password: "passwords_mismatch:@password",
        country: "required|country_excluded:Antarctica",
        tos: "tos",
      },
      loginSchema: {
        email: "required||min:3|max:100|email",
        password: "required|min:3|max:100",
      },
      userData: {
        country: "USA",
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: "bg-blue-500",
      reg_alert_msg: "Please wait! Your account is being created.",
    };
  },
  computed: {
    ...mapState({
      authModalShow: (state) => state.auth.authModalShow,
    }),
  },
  methods: {
    ...mapMutations(["toggleAuthModal"]),
    // eslint-disable-next-line no-unused-vars
  },
  components: { AppLoginForm, AppRegisterForm },
};
</script>
