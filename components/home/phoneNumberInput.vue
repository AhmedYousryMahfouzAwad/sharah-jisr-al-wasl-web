<template>
  <div class="phone-number__input">
    <label :for="name" class="mb-2" :style="{ color: labelColor }">{{ label }}</label>
    <span v-if="subLabel" class="sub-label ms-1" :style="{ color: subLabelColor }">{{ subLabel }}</span>

    <div class="input-wrapper position-relative">

      <template v-if="readonly">
        <input 
          :value="value"
          :type="type" 
          :name="name"
          readonly
          class="form-input form-control w-100"
          :style="inputStyle" 
        />
      </template>

      <template v-else>
        <Field
          v-model="modelValue"
          :name="name"
          :type="type"
          :placeholder="placeholder"
          :rules="validationSchema"
          validate-on-input
          v-slot="{ field, errorMessage }"
        >
          <input 
            v-bind="field"
            :type="type" 
            :name="name" 
            :placeholder="placeholder" 
            class="form-input form-control w-100"
            :class="[{ 'is-invalid': errorMessage }, localeDir]"
            :style="inputStyle" 
          />

          <!-- Display validation error message -->
          <span v-if="errorMessage" class="error-message position-absolute text-danger mt-1" :class="localeDir">{{ errorMessage }}</span>
        </Field>
      </template>

      <div class="country-code d-flex align-items-center position-absolute" :class="localeDir">
        <img src="@/assets/imgs/icons/ksa-flag.png" alt="ksa-flag" />
        <span class="code">+966</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import * as yup from 'yup';

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
  },
  subLabel: {
    type: String,
    required: false
  },
  labelColor: {
    type: String,
    required: false
  },
  subLabelColor: {
    type: String,
    required: false,
    default: '#AEAEAE'
  },
  placeholder: {
    type: String,
    required: false
  },
  inputHeight: {
    type: String,
    default: '54px'
  },
  borderRadius: {
    type: String,
    default: '8px'
  },
  inputFontSize: {
    type: String,
    required: false
  },
  inputColor: {
    type: String,
    required: false
  },
  borderColor: {
    type: String,
    required: false
  },
  inputFontWeight: {
    type: String,
    required: false
  },
  inputBgColor: {
    type: String,
    default: 'transparent'
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  value: {
    type: String,
    required: false
  },
  validationSchema: {
    type: Object,
    required: false,
    default: () => yup.string().required('This field is required')
  }
})

const { locale } = useI18n();

const localeDir = computed(() => {
  return locale.value === 'en' ? 'ltr' : 'rtl';
})

const inputStyle = computed(() => {
  return {
    'height': props.inputHeight, 
    'borderRadius': props.borderRadius, 
    'backgroundColor': props.inputBgColor,
    'fontSize': props.inputFontSize,
    'color': props.inputColor,
    'fontWeight': props.inputFontWeight,
    'borderColor': props.borderColor,
    'padding-inline-start': '28px',
    'padding-inline-end': '87px'
  }
})

const modelValue = defineModel('modelValue')
</script>

<style lang="scss" scoped>
.form-group {
  width: 100%;

  label {
    font-size: 14px;
    font-weight: 400;
    color: #1E1E1E;
  }

  .sub-label {
    font-size: 14px;
    font-weight: 400;
  }

  .input-wrapper {

    input {

      &::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: #949494;
      }
    }

    .error-message {
      position: absolute;
      bottom: 3px;

      &.rtl {
        left: 22px;
      }

      &.ltr {
        right: 22px;
      }
    }
  }

}


.country-code {

  top: 0%;
  bottom: 0;
  left: 10px;
  border-inline-start: 0.5px solid #707070;
  height: 100%;
  padding-inline-start: 5px;
  gap: 5px;

  .code {
    font-size: 16px;
    font-weight: 400;
    margin-top: 4px;
  }

// &.rtl {
//   right: 1rem;
//   transform: translate(-50%,-50%)!important;
// }

&.ltr {
  left: unset !important;
  right: 10px;
}
}
</style>