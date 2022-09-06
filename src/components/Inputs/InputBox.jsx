import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Skeleton,
} from "@chakra-ui/react";

/**
 * Cria uma Inpux Box multiuso.
 * @method InputBox
 * @memberof module:Inputs
 * @param {String} id id do formulário
 * @param {Object} errors manipula as mensagens de erro
 * @param {String} label label do formulário
 * @param {String} type tipo de formulário
 * @param {String} placeholder tipo de placeholder a ser colocado
 * como exemplo
 * @param {Object} register define parâmetros de register
 * @param {*} required marca a Box como um campo obrigatório (true)
 * ou opcional (false) (padrão: "Obrigatório" - força o campo como
 * obrigatório, com o texto "Obrigatório")
 * @param {Object} validate define os critérios da validação do campo
 * @param {Boolean} isLoaded realiza a animação diretamente (true) ou
 * não. Caso seja colocado em false, deve ser transmitido um valor para
 * realizar o carregamento do Skeleton (padrão: true - ativa a animação
 * automaticamente)
 * @param {Function} onChange transmite um callback após a validação
 * do campo
 * @param {Object} value dados do formulário. Pode ser utilizado juntamente
 * com setValue para receber os valores por meio de função
 * @param {Function} setValue provê uma função que entrega dados do
 * formulário, de acordo com seu id.
 * @returns {Component} componente de Input Box
 */
export function InputBox({
  id,
  formControl: {
    trigger,
    formState: { errors },
    register,
    setValue,
  },
  label,
  type,
  placeholder,
  required = "Obrigatório",
  validate,
  isLoaded = true,
  onChange,
  value,
  shadow = "md",
  colorScheme = "primary",
  ...props
}) {
  value ? setValue(id, value) : null;
  return (
    <Box px={0.5}>
      <FormControl id={id} isInvalid={errors[id]}>
        <FormLabel>{label}</FormLabel>
        <Skeleton
          isLoaded={isLoaded}
          fadeDuration={0.5}
          rounded="lg"
          shadow={!isLoaded && "inner"}
        >
          <Input
            type={type}
            placeholder={placeholder}
            {...register(id, {
              required: required,
              validate: validate,
              onChange: onChange,
            })}
            shadow={shadow}
            colorScheme={colorScheme}
            {...props}
          />
        </Skeleton>
        <FormErrorMessage>{errors[id]?.message}</FormErrorMessage>
      </FormControl>
    </Box>
  );
}
