(function (MDCFoundation,MDCComponent,index,util,index$1,index$2,index$3) {
  'use strict';

  MDCFoundation = MDCFoundation && MDCFoundation.hasOwnProperty('default') ? MDCFoundation['default'] : MDCFoundation;
  MDCComponent = MDCComponent && MDCComponent.hasOwnProperty('default') ? MDCComponent['default'] : MDCComponent;

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  const strings = {
    ARIA_CONTROLS: 'aria-controls',
    INPUT_SELECTOR: '.mdc-text-field__input',
    LABEL_SELECTOR: '.mdc-floating-label',
    ICON_SELECTOR: '.mdc-text-field__icon',
    OUTLINE_SELECTOR: '.mdc-notched-outline',
    LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
  };

  /** @enum {string} */
  const cssClasses = {
    ROOT: 'mdc-text-field',
    UPGRADED: 'mdc-text-field--upgraded',
    DISABLED: 'mdc-text-field--disabled',
    DENSE: 'mdc-text-field--dense',
    FOCUSED: 'mdc-text-field--focused',
    INVALID: 'mdc-text-field--invalid',
    BOX: 'mdc-text-field--box',
    OUTLINED: 'mdc-text-field--outlined',
  };

  /** @enum {number} */
  const numbers = {
    LABEL_SCALE: 0.75,
    DENSE_LABEL_SCALE: 0.923,
  };

  // whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
  // under section: `Validation-related attributes`
  const VALIDATION_ATTR_WHITELIST = [
    'pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength',
  ];

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  const strings$1 = {
    ARIA_HIDDEN: 'aria-hidden',
    ROLE: 'role',
  };

  /** @enum {string} */
  const cssClasses$1 = {
    HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
    HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg',
  };

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */


  /**
   * @extends {MDCFoundation<!MDCTextFieldHelperTextAdapter>}
   * @final
   */
  class MDCTextFieldHelperTextFoundation extends MDCFoundation {
    /** @return enum {string} */
    static get cssClasses() {
      return cssClasses$1;
    }

    /** @return enum {string} */
    static get strings() {
      return strings$1;
    }

    /**
     * {@see MDCTextFieldHelperTextAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldHelperTextAdapter}
     */
    static get defaultAdapter() {
      return /** @type {!MDCTextFieldHelperTextAdapter} */ ({
        addClass: () => {},
        removeClass: () => {},
        hasClass: () => {},
        setAttr: () => {},
        removeAttr: () => {},
        setContent: () => {},
      });
    }

    /**
     * @param {!MDCTextFieldHelperTextAdapter} adapter
     */
    constructor(adapter) {
      super(Object.assign(MDCTextFieldHelperTextFoundation.defaultAdapter, adapter));
    }

    /**
     * Sets the content of the helper text field.
     * @param {string} content
     */
    setContent(content) {
      this.adapter_.setContent(content);
    }

    /** @param {boolean} isPersistent Sets the persistency of the helper text. */
    setPersistent(isPersistent) {
      if (isPersistent) {
        this.adapter_.addClass(cssClasses$1.HELPER_TEXT_PERSISTENT);
      } else {
        this.adapter_.removeClass(cssClasses$1.HELPER_TEXT_PERSISTENT);
      }
    }

    /**
     * @param {boolean} isValidation True to make the helper text act as an
     *   error validation message.
     */
    setValidation(isValidation) {
      if (isValidation) {
        this.adapter_.addClass(cssClasses$1.HELPER_TEXT_VALIDATION_MSG);
      } else {
        this.adapter_.removeClass(cssClasses$1.HELPER_TEXT_VALIDATION_MSG);
      }
    }

    /** Makes the helper text visible to the screen reader. */
    showToScreenReader() {
      this.adapter_.removeAttr(strings$1.ARIA_HIDDEN);
    }

    /**
     * Sets the validity of the helper text based on the input validity.
     * @param {boolean} inputIsValid
     */
    setValidity(inputIsValid) {
      const helperTextIsPersistent = this.adapter_.hasClass(cssClasses$1.HELPER_TEXT_PERSISTENT);
      const helperTextIsValidationMsg = this.adapter_.hasClass(cssClasses$1.HELPER_TEXT_VALIDATION_MSG);
      const validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

      if (validationMsgNeedsDisplay) {
        this.adapter_.setAttr(strings$1.ROLE, 'alert');
      } else {
        this.adapter_.removeAttr(strings$1.ROLE);
      }

      if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
        this.hide_();
      }
    }

    /**
     * Hides the help text from screen readers.
     * @private
     */
    hide_() {
      this.adapter_.setAttr(strings$1.ARIA_HIDDEN, 'true');
    }
  }

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  const strings$2 = {
    ICON_EVENT: 'MDCTextField:icon',
    ICON_ROLE: 'button',
  };

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */


  /**
   * @extends {MDCFoundation<!MDCTextFieldIconAdapter>}
   * @final
   */
  class MDCTextFieldIconFoundation extends MDCFoundation {
    /** @return enum {string} */
    static get strings() {
      return strings$2;
    }

    /**
     * {@see MDCTextFieldIconAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldIconAdapter}
     */
    static get defaultAdapter() {
      return /** @type {!MDCTextFieldIconAdapter} */ ({
        getAttr: () => {},
        setAttr: () => {},
        removeAttr: () => {},
        setContent: () => {},
        registerInteractionHandler: () => {},
        deregisterInteractionHandler: () => {},
        notifyIconAction: () => {},
      });
    }

    /**
     * @param {!MDCTextFieldIconAdapter} adapter
     */
    constructor(adapter) {
      super(Object.assign(MDCTextFieldIconFoundation.defaultAdapter, adapter));

      /** @private {string?} */
      this.savedTabIndex_ = null;

      /** @private {function(!Event): undefined} */
      this.interactionHandler_ = (evt) => this.handleInteraction(evt);
    }

    init() {
      this.savedTabIndex_ = this.adapter_.getAttr('tabindex');

      ['click', 'keydown'].forEach((evtType) => {
        this.adapter_.registerInteractionHandler(evtType, this.interactionHandler_);
      });
    }

    destroy() {
      ['click', 'keydown'].forEach((evtType) => {
        this.adapter_.deregisterInteractionHandler(evtType, this.interactionHandler_);
      });
    }

    /** @param {boolean} disabled */
    setDisabled(disabled) {
      if (!this.savedTabIndex_) {
        return;
      }

      if (disabled) {
        this.adapter_.setAttr('tabindex', '-1');
        this.adapter_.removeAttr('role');
      } else {
        this.adapter_.setAttr('tabindex', this.savedTabIndex_);
        this.adapter_.setAttr('role', strings$2.ICON_ROLE);
      }
    }

    /** @param {string} label */
    setAriaLabel(label) {
      this.adapter_.setAttr('aria-label', label);
    }

    /** @param {string} content */
    setContent(content) {
      this.adapter_.setContent(content);
    }

    /**
     * Handles an interaction event
     * @param {!Event} evt
     */
    handleInteraction(evt) {
      if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
        this.adapter_.notifyIconAction();
      }
    }
  }

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */


  /**
   * @extends {MDCFoundation<!MDCTextFieldAdapter>}
   * @final
   */
  class MDCTextFieldFoundation extends MDCFoundation {
    /** @return enum {string} */
    static get cssClasses() {
      return cssClasses;
    }

    /** @return enum {string} */
    static get strings() {
      return strings;
    }

    /** @return enum {string} */
    static get numbers() {
      return numbers;
    }

    /** @return {boolean} */
    get shouldShake() {
      return !this.isValid() && !this.isFocused_;
    }

    /** @return {boolean} */
    get shouldFloat() {
      return this.isFocused_ || !!this.getValue() || this.isBadInput_();
    }

    /**
     * {@see MDCTextFieldAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldAdapter}
     */
    static get defaultAdapter() {
      return /** @type {!MDCTextFieldAdapter} */ ({
        addClass: () => {},
        removeClass: () => {},
        hasClass: () => {},
        registerTextFieldInteractionHandler: () => {},
        deregisterTextFieldInteractionHandler: () => {},
        registerInputInteractionHandler: () => {},
        deregisterInputInteractionHandler: () => {},
        registerValidationAttributeChangeHandler: () => {},
        deregisterValidationAttributeChangeHandler: () => {},
        getNativeInput: () => {},
        isFocused: () => {},
        isRtl: () => {},
        activateLineRipple: () => {},
        deactivateLineRipple: () => {},
        setLineRippleTransformOrigin: () => {},
        shakeLabel: () => {},
        floatLabel: () => {},
        hasLabel: () => {},
        getLabelWidth: () => {},
        hasOutline: () => {},
        notchOutline: () => {},
        closeOutline: () => {},
      });
    }

    /**
     * @param {!MDCTextFieldAdapter} adapter
     * @param {!FoundationMapType=} foundationMap Map from subcomponent names to their subfoundations.
     */
    constructor(adapter, foundationMap = /** @type {!FoundationMapType} */ ({})) {
      super(Object.assign(MDCTextFieldFoundation.defaultAdapter, adapter));

      /** @type {!MDCTextFieldHelperTextFoundation|undefined} */
      this.helperText_ = foundationMap.helperText;
      /** @type {!MDCTextFieldIconFoundation|undefined} */
      this.icon_ = foundationMap.icon;

      /** @private {boolean} */
      this.isFocused_ = false;
      /** @private {boolean} */
      this.receivedUserInput_ = false;
      /** @private {boolean} */
      this.useCustomValidityChecking_ = false;
      /** @private {boolean} */
      this.isValid_ = true;
      /** @private {function(): undefined} */
      this.inputFocusHandler_ = () => this.activateFocus();
      /** @private {function(): undefined} */
      this.inputBlurHandler_ = () => this.deactivateFocus();
      /** @private {function(): undefined} */
      this.inputInputHandler_ = () => this.autoCompleteFocus();
      /** @private {function(!Event): undefined} */
      this.setPointerXOffset_ = (evt) => this.setTransformOrigin(evt);
      /** @private {function(!Event): undefined} */
      this.textFieldInteractionHandler_ = () => this.handleTextFieldInteraction();
      /** @private {function(!Array): undefined} */
      this.validationAttributeChangeHandler_ = (attributesList) => this.handleValidationAttributeChange(attributesList);

      /** @private {!MutationObserver} */
      this.validationObserver_;
    }

    init() {
      this.adapter_.addClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
      // Ensure label does not collide with any pre-filled value.
      if (this.adapter_.hasLabel() && (this.getValue() || this.isBadInput_())) {
        this.adapter_.floatLabel(this.shouldFloat);
        this.notchOutline(this.shouldFloat);
      }

      if (this.adapter_.isFocused()) {
        this.inputFocusHandler_();
      }

      this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
      this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
      this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
      ['mousedown', 'touchstart'].forEach((evtType) => {
        this.adapter_.registerInputInteractionHandler(evtType, this.setPointerXOffset_);
      });
      ['click', 'keydown'].forEach((evtType) => {
        this.adapter_.registerTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler_);
      });
      this.validationObserver_ =
          this.adapter_.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
    }

    destroy() {
      this.adapter_.removeClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
      this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
      this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
      this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
      ['mousedown', 'touchstart'].forEach((evtType) => {
        this.adapter_.deregisterInputInteractionHandler(evtType, this.setPointerXOffset_);
      });
      ['click', 'keydown'].forEach((evtType) => {
        this.adapter_.deregisterTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler_);
      });
      this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_);
    }

    /**
     * Handles user interactions with the Text Field.
     */
    handleTextFieldInteraction() {
      if (this.adapter_.getNativeInput().disabled) {
        return;
      }
      this.receivedUserInput_ = true;
    }

    /**
     * Handles validation attribute changes
     * @param {!Array<string>} attributesList
     */
    handleValidationAttributeChange(attributesList) {
      attributesList.some((attributeName) => {
        if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
          this.styleValidity_(true);
          return true;
        }
      });
    }

    /**
     * Opens/closes the notched outline.
     * @param {boolean} openNotch
     */
    notchOutline(openNotch) {
      if (!this.adapter_.hasOutline() || !this.adapter_.hasLabel()) {
        return;
      }

      if (openNotch) {
        const isDense = this.adapter_.hasClass(cssClasses.DENSE);
        const labelScale = isDense ? numbers.DENSE_LABEL_SCALE : numbers.LABEL_SCALE;
        const labelWidth = this.adapter_.getLabelWidth() * labelScale;
        const isRtl = this.adapter_.isRtl();
        this.adapter_.notchOutline(labelWidth, isRtl);
      } else {
        this.adapter_.closeOutline();
      }
    }

    /**
     * Activates the text field focus state.
     */
    activateFocus() {
      this.isFocused_ = true;
      this.styleFocused_(this.isFocused_);
      this.adapter_.activateLineRipple();
      this.notchOutline(this.shouldFloat);
      if (this.adapter_.hasLabel()) {
        this.adapter_.shakeLabel(this.shouldShake);
        this.adapter_.floatLabel(this.shouldFloat);
      }
      if (this.helperText_) {
        this.helperText_.showToScreenReader();
      }
    }

    /**
     * Sets the line ripple's transform origin, so that the line ripple activate
     * animation will animate out from the user's click location.
     * @param {!Event} evt
     */
    setTransformOrigin(evt) {
      const targetClientRect = evt.target.getBoundingClientRect();
      const evtCoords = {x: evt.clientX, y: evt.clientY};
      const normalizedX = evtCoords.x - targetClientRect.left;
      this.adapter_.setLineRippleTransformOrigin(normalizedX);
    }

    /**
     * Activates the Text Field's focus state in cases when the input value
     * changes without user input (e.g. programatically).
     */
    autoCompleteFocus() {
      if (!this.receivedUserInput_) {
        this.activateFocus();
      }
    }

    /**
     * Deactivates the Text Field's focus state.
     */
    deactivateFocus() {
      this.isFocused_ = false;
      this.adapter_.deactivateLineRipple();
      const input = this.getNativeInput_();
      const shouldRemoveLabelFloat = !input.value && !this.isBadInput_();
      const isValid = this.isValid();
      this.styleValidity_(isValid);
      this.styleFocused_(this.isFocused_);
      if (this.adapter_.hasLabel()) {
        this.adapter_.shakeLabel(this.shouldShake);
        this.adapter_.floatLabel(this.shouldFloat);
        this.notchOutline(this.shouldFloat);
      }
      if (shouldRemoveLabelFloat) {
        this.receivedUserInput_ = false;
      }
    }

    /**
     * @return {string} The value of the input Element.
     */
    getValue() {
      return this.getNativeInput_().value;
    }

    /**
     * @param {string} value The value to set on the input Element.
     */
    setValue(value) {
      this.getNativeInput_().value = value;
      const isValid = this.isValid();
      this.styleValidity_(isValid);
      if (this.adapter_.hasLabel()) {
        this.adapter_.shakeLabel(this.shouldShake);
        this.adapter_.floatLabel(this.shouldFloat);
        this.notchOutline(this.shouldFloat);
      }
    }

    /**
     * @return {boolean} If a custom validity is set, returns that value.
     *     Otherwise, returns the result of native validity checks.
     */
    isValid() {
      return this.useCustomValidityChecking_
        ? this.isValid_ : this.isNativeInputValid_();
    }

    /**
     * @param {boolean} isValid Sets the validity state of the Text Field.
     */
    setValid(isValid) {
      this.useCustomValidityChecking_ = true;
      this.isValid_ = isValid;
      // Retrieve from the getter to ensure correct logic is applied.
      isValid = this.isValid();
      this.styleValidity_(isValid);
      if (this.adapter_.hasLabel()) {
        this.adapter_.shakeLabel(this.shouldShake);
      }
    }

    /**
     * @return {boolean} True if the Text Field is disabled.
     */
    isDisabled() {
      return this.getNativeInput_().disabled;
    }

    /**
     * @param {boolean} disabled Sets the text-field disabled or enabled.
     */
    setDisabled(disabled) {
      this.getNativeInput_().disabled = disabled;
      this.styleDisabled_(disabled);
    }

    /**
     * @param {string} content Sets the content of the helper text.
     */
    setHelperTextContent(content) {
      if (this.helperText_) {
        this.helperText_.setContent(content);
      }
    }

    /**
     * Sets the aria label of the icon.
     * @param {string} label
     */
    setIconAriaLabel(label) {
      if (this.icon_) {
        this.icon_.setAriaLabel(label);
      }
    }

    /**
     * Sets the text content of the icon.
     * @param {string} content
     */
    setIconContent(content) {
      if (this.icon_) {
        this.icon_.setContent(content);
      }
    }

    /**
     * @return {boolean} True if the Text Field input fails in converting the
     *     user-supplied value.
     * @private
     */
    isBadInput_() {
      return this.getNativeInput_().validity.badInput;
    }

    /**
     * @return {boolean} The result of native validity checking
     *     (ValidityState.valid).
     */
    isNativeInputValid_() {
      return this.getNativeInput_().validity.valid;
    }

    /**
     * Styles the component based on the validity state.
     * @param {boolean} isValid
     * @private
     */
    styleValidity_(isValid) {
      const {INVALID} = MDCTextFieldFoundation.cssClasses;
      if (isValid) {
        this.adapter_.removeClass(INVALID);
      } else {
        this.adapter_.addClass(INVALID);
      }
      if (this.helperText_) {
        this.helperText_.setValidity(isValid);
      }
    }

    /**
     * Styles the component based on the focused state.
     * @param {boolean} isFocused
     * @private
     */
    styleFocused_(isFocused) {
      const {FOCUSED} = MDCTextFieldFoundation.cssClasses;
      if (isFocused) {
        this.adapter_.addClass(FOCUSED);
      } else {
        this.adapter_.removeClass(FOCUSED);
      }
    }

    /**
     * Styles the component based on the disabled state.
     * @param {boolean} isDisabled
     * @private
     */
    styleDisabled_(isDisabled) {
      const {DISABLED, INVALID} = MDCTextFieldFoundation.cssClasses;
      if (isDisabled) {
        this.adapter_.addClass(DISABLED);
        this.adapter_.removeClass(INVALID);
      } else {
        this.adapter_.removeClass(DISABLED);
      }
      if (this.icon_) {
        this.icon_.setDisabled(isDisabled);
      }
    }

    /**
     * @return {!Element|!NativeInputType} The native text input from the
     * host environment, or a dummy if none exists.
     * @private
     */
    getNativeInput_() {
      return this.adapter_.getNativeInput() ||
      /** @type {!NativeInputType} */ ({
        value: '',
        disabled: false,
        validity: {
          badInput: false,
          valid: true,
        },
      });
    }
  }

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCComponent<!MDCTextFieldHelperTextFoundation>}
   * @final
   */
  class MDCTextFieldHelperText extends MDCComponent {
    /**
     * @param {!Element} root
     * @return {!MDCTextFieldHelperText}
     */
    static attachTo(root) {
      return new MDCTextFieldHelperText(root);
    }

    /**
     * @return {!MDCTextFieldHelperTextFoundation}
     */
    get foundation() {
      return this.foundation_;
    }

    /**
     * @return {!MDCTextFieldHelperTextFoundation}
     */
    getDefaultFoundation() {
      return new MDCTextFieldHelperTextFoundation(/** @type {!MDCTextFieldHelperTextAdapter} */ (Object.assign({
        addClass: (className) => this.root_.classList.add(className),
        removeClass: (className) => this.root_.classList.remove(className),
        hasClass: (className) => this.root_.classList.contains(className),
        setAttr: (attr, value) => this.root_.setAttribute(attr, value),
        removeAttr: (attr) => this.root_.removeAttribute(attr),
        setContent: (content) => {
          this.root_.textContent = content;
        },
      })));
    }
  }

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @extends {MDCComponent<!MDCTextFieldIconFoundation>}
   * @final
   */
  class MDCTextFieldIcon extends MDCComponent {
    /**
     * @param {!Element} root
     * @return {!MDCTextFieldIcon}
     */
    static attachTo(root) {
      return new MDCTextFieldIcon(root);
    }

    /**
     * @return {!MDCTextFieldIconFoundation}
     */
    get foundation() {
      return this.foundation_;
    }

    /**
     * @return {!MDCTextFieldIconFoundation}
     */
    getDefaultFoundation() {
      return new MDCTextFieldIconFoundation(/** @type {!MDCTextFieldIconAdapter} */ (Object.assign({
        getAttr: (attr) => this.root_.getAttribute(attr),
        setAttr: (attr, value) => this.root_.setAttribute(attr, value),
        removeAttr: (attr) => this.root_.removeAttribute(attr),
        setContent: (content) => {
          this.root_.textContent = content;
        },
        registerInteractionHandler: (evtType, handler) => this.root_.addEventListener(evtType, handler),
        deregisterInteractionHandler: (evtType, handler) => this.root_.removeEventListener(evtType, handler),
        notifyIconAction: () => this.emit(
          MDCTextFieldIconFoundation.strings.ICON_EVENT, {} /* evtData */, true /* shouldBubble */),
      })));
    }
  }

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  /* eslint-enable no-unused-vars */

  /**
   * @extends {MDCComponent<!MDCTextFieldFoundation>}
   * @final
   */
  class MDCTextField extends MDCComponent {
    /**
     * @param {...?} args
     */
    constructor(...args) {
      super(...args);
      /** @private {?Element} */
      this.input_;
      /** @type {?MDCRipple} */
      this.ripple;
      /** @private {?MDCLineRipple} */
      this.lineRipple_;
      /** @private {?MDCTextFieldHelperText} */
      this.helperText_;
      /** @private {?MDCTextFieldIcon} */
      this.icon_;
      /** @private {?MDCFloatingLabel} */
      this.label_;
      /** @private {?MDCNotchedOutline} */
      this.outline_;
    }

    /**
     * @param {!Element} root
     * @return {!MDCTextField}
     */
    static attachTo(root) {
      return new MDCTextField(root);
    }

    /**
     * @param {(function(!Element): !MDCRipple)=} rippleFactory A function which
     * creates a new MDCRipple.
     * @param {(function(!Element): !MDCLineRipple)=} lineRippleFactory A function which
     * creates a new MDCLineRipple.
     * @param {(function(!Element): !MDCTextFieldHelperText)=} helperTextFactory A function which
     * creates a new MDCTextFieldHelperText.
     * @param {(function(!Element): !MDCTextFieldIcon)=} iconFactory A function which
     * creates a new MDCTextFieldIcon.
     * @param {(function(!Element): !MDCFloatingLabel)=} labelFactory A function which
     * creates a new MDCFloatingLabel.
     * @param {(function(!Element): !MDCNotchedOutline)=} outlineFactory A function which
     * creates a new MDCNotchedOutline.
     */
    initialize(
      rippleFactory = (el, foundation) => new index.MDCRipple(el, foundation),
      lineRippleFactory = (el) => new index$1.MDCLineRipple(el),
      helperTextFactory = (el) => new MDCTextFieldHelperText(el),
      iconFactory = (el) => new MDCTextFieldIcon(el),
      labelFactory = (el) => new index$2.MDCFloatingLabel(el),
      outlineFactory = (el) => new index$3.MDCNotchedOutline(el)) {
      this.input_ = this.root_.querySelector(strings.INPUT_SELECTOR);
      const labelElement = this.root_.querySelector(strings.LABEL_SELECTOR);
      if (labelElement) {
        this.label_ = labelFactory(labelElement);
      }
      const lineRippleElement = this.root_.querySelector(strings.LINE_RIPPLE_SELECTOR);
      if (lineRippleElement) {
        this.lineRipple_ = lineRippleFactory(lineRippleElement);
      }
      const outlineElement = this.root_.querySelector(strings.OUTLINE_SELECTOR);
      if (outlineElement) {
        this.outline_ = outlineFactory(outlineElement);
      }
      if (this.input_.hasAttribute(strings.ARIA_CONTROLS)) {
        const helperTextElement = document.getElementById(this.input_.getAttribute(strings.ARIA_CONTROLS));
        if (helperTextElement) {
          this.helperText_ = helperTextFactory(helperTextElement);
        }
      }
      const iconElement = this.root_.querySelector(strings.ICON_SELECTOR);
      if (iconElement) {
        this.icon_ = iconFactory(iconElement);
      }

      this.ripple = null;
      if (this.root_.classList.contains(cssClasses.BOX)) {
        const MATCHES = util.getMatchesProperty(HTMLElement.prototype);
        const adapter =
          Object.assign(index.MDCRipple.createAdapter(/** @type {!RippleCapableSurface} */ (this)), {
            isSurfaceActive: () => this.input_[MATCHES](':active'),
            registerInteractionHandler: (type, handler) => this.input_.addEventListener(type, handler),
            deregisterInteractionHandler: (type, handler) => this.input_.removeEventListener(type, handler),
          });
        const foundation = new index.MDCRippleFoundation(adapter);
        this.ripple = rippleFactory(this.root_, foundation);
      }
    }

    destroy() {
      if (this.ripple) {
        this.ripple.destroy();
      }
      if (this.lineRipple_) {
        this.lineRipple_.destroy();
      }
      if (this.helperText_) {
        this.helperText_.destroy();
      }
      if (this.icon_) {
        this.icon_.destroy();
      }
      if (this.label_) {
        this.label_.destroy();
      }
      if (this.outline_) {
        this.outline_.destroy();
      }
      super.destroy();
    }

    /**
     * Initiliazes the Text Field's internal state based on the environment's
     * state.
     */
    initialSyncWithDom() {
      this.disabled = this.input_.disabled;
    }

    /**
     * @return {string} The value of the input.
     */
    get value() {
      return this.foundation_.getValue();
    }

    /**
     * @param {string} value The value to set on the input.
     */
    set value(value) {
      this.foundation_.setValue(value);
    }

    /**
     * @return {boolean} True if the Text Field is disabled.
     */
    get disabled() {
      return this.foundation_.isDisabled();
    }

    /**
     * @param {boolean} disabled Sets the Text Field disabled or enabled.
     */
    set disabled(disabled) {
      this.foundation_.setDisabled(disabled);
    }

    /**
     * @return {boolean} valid True if the Text Field is valid.
     */
    get valid() {
      return this.foundation_.isValid();
    }

    /**
     * @param {boolean} valid Sets the Text Field valid or invalid.
     */
    set valid(valid) {
      this.foundation_.setValid(valid);
    }

    /**
     * @return {boolean} True if the Text Field is required.
     */
    get required() {
      return this.input_.required;
    }

    /**
     * @param {boolean} required Sets the Text Field to required.
     */
    set required(required) {
      this.input_.required = required;
    }

    /**
     * @return {string} The input element's validation pattern.
     */
    get pattern() {
      return this.input_.pattern;
    }

    /**
     * @param {string} pattern Sets the input element's validation pattern.
     */
    set pattern(pattern) {
      this.input_.pattern = pattern;
    }

    /**
     * @return {number} The input element's minLength.
     */
    get minLength() {
      return this.input_.minLength;
    }

    /**
     * @param {number} minLength Sets the input element's minLength.
     */
    set minLength(minLength) {
      this.input_.minLength = minLength;
    }

    /**
     * @return {number} The input element's maxLength.
     */
    get maxLength() {
      return this.input_.maxLength;
    }

    /**
     * @param {number} maxLength Sets the input element's maxLength.
     */
    set maxLength(maxLength) {
      // Chrome throws exception if maxLength is set < 0
      if (maxLength < 0) {
        this.input_.removeAttribute('maxLength');
      } else {
        this.input_.maxLength = maxLength;
      }
    }

    /**
     * @return {string} The input element's min.
     */
    get min() {
      return this.input_.min;
    }

    /**
     * @param {string} min Sets the input element's min.
     */
    set min(min) {
      this.input_.min = min;
    }

    /**
     * @return {string} The input element's max.
     */
    get max() {
      return this.input_.max;
    }

    /**
     * @param {string} max Sets the input element's max.
     */
    set max(max) {
      this.input_.max = max;
    }

    /**
     * @return {string} The input element's step.
     */
    get step() {
      return this.input_.step;
    }

    /**
     * @param {string} step Sets the input element's step.
     */
    set step(step) {
      this.input_.step = step;
    }

    /**
     * Sets the helper text element content.
     * @param {string} content
     */
    set helperTextContent(content) {
      this.foundation_.setHelperTextContent(content);
    }

    /**
     * Sets the aria label of the icon.
     * @param {string} label
     */
    set iconAriaLabel(label) {
      this.foundation_.setIconAriaLabel(label);
    }

    /**
     * Sets the text content of the icon.
     * @param {string} content
     */
    set iconContent(content) {
      this.foundation_.setIconContent(content);
    }

    /**
     * Recomputes the outline SVG path for the outline element.
     */
    layout() {
      const openNotch = this.foundation_.shouldFloat;
      this.foundation_.notchOutline(openNotch);
    }

    /**
     * @return {!MDCTextFieldFoundation}
     */
    getDefaultFoundation() {
      return new MDCTextFieldFoundation(
        /** @type {!MDCTextFieldAdapter} */ (Object.assign({
          addClass: (className) => this.root_.classList.add(className),
          removeClass: (className) => this.root_.classList.remove(className),
          hasClass: (className) => this.root_.classList.contains(className),
          registerTextFieldInteractionHandler: (evtType, handler) => this.root_.addEventListener(evtType, handler),
          deregisterTextFieldInteractionHandler: (evtType, handler) => this.root_.removeEventListener(evtType, handler),
          registerValidationAttributeChangeHandler: (handler) => {
            const getAttributesList = (mutationsList) => mutationsList.map((mutation) => mutation.attributeName);
            const observer = new MutationObserver((mutationsList) => handler(getAttributesList(mutationsList)));
            const targetNode = this.root_.querySelector(strings.INPUT_SELECTOR);
            const config = {attributes: true};
            observer.observe(targetNode, config);
            return observer;
          },
          deregisterValidationAttributeChangeHandler: (observer) => observer.disconnect(),
          isFocused: () => {
            return document.activeElement === this.root_.querySelector(strings.INPUT_SELECTOR);
          },
          isRtl: () => window.getComputedStyle(this.root_).getPropertyValue('direction') === 'rtl',
        },
        this.getInputAdapterMethods_(),
        this.getLabelAdapterMethods_(),
        this.getLineRippleAdapterMethods_(),
        this.getOutlineAdapterMethods_())),
        this.getFoundationMap_());
    }

    /**
     * @return {!{
     *   shakeLabel: function(boolean): undefined,
     *   floatLabel: function(boolean): undefined,
     *   hasLabel: function(): boolean,
     *   getLabelWidth: function(): number,
     * }}
     */
    getLabelAdapterMethods_() {
      return {
        shakeLabel: (shouldShake) => this.label_.shake(shouldShake),
        floatLabel: (shouldFloat) => this.label_.float(shouldFloat),
        hasLabel: () => !!this.label_,
        getLabelWidth: () => this.label_.getWidth(),
      };
    }

    /**
     * @return {!{
     *   activateLineRipple: function(): undefined,
     *   deactivateLineRipple: function(): undefined,
     *   setLineRippleTransformOrigin: function(number): undefined,
     * }}
     */
    getLineRippleAdapterMethods_() {
      return {
        activateLineRipple: () => {
          if (this.lineRipple_) {
            this.lineRipple_.activate();
          }
        },
        deactivateLineRipple: () => {
          if (this.lineRipple_) {
            this.lineRipple_.deactivate();
          }
        },
        setLineRippleTransformOrigin: (normalizedX) => {
          if (this.lineRipple_) {
            this.lineRipple_.setRippleCenter(normalizedX);
          }
        },
      };
    }

    /**
     * @return {!{
     *   notchOutline: function(number, boolean): undefined,
     *   hasOutline: function(): boolean,
     * }}
     */
    getOutlineAdapterMethods_() {
      return {
        notchOutline: (labelWidth, isRtl) => this.outline_.notch(labelWidth, isRtl),
        closeOutline: () => this.outline_.closeNotch(),
        hasOutline: () => !!this.outline_,
      };
    }

    /**
     * @return {!{
     *   registerInputInteractionHandler: function(string, function()): undefined,
     *   deregisterInputInteractionHandler: function(string, function()): undefined,
     *   getNativeInput: function(): ?Element,
     * }}
     */
    getInputAdapterMethods_() {
      return {
        registerInputInteractionHandler: (evtType, handler) => this.input_.addEventListener(evtType, handler),
        deregisterInputInteractionHandler: (evtType, handler) => this.input_.removeEventListener(evtType, handler),
        getNativeInput: () => this.input_,
      };
    }

    /**
     * Returns a map of all subcomponents to subfoundations.
     * @return {!FoundationMapType}
     */
    getFoundationMap_() {
      return {
        helperText: this.helperText_ ? this.helperText_.foundation : undefined,
        icon: this.icon_ ? this.icon_.foundation : undefined,
      };
    }
  }

  const textField = new MDCTextField(document.querySelector('#scroll-multiplier'));

}(MDCFoundation,MDCComponent,index,util,index$1,index$2,index$3));
