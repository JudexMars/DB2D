import { darken } from "polished";
import { InviteUser, useGroup } from "providers/GroupProvider";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";

import Avatar from "components/Avatar";
import Button from "components/Button";
import DotMenu, { MenuItem } from "components/DotMenu";
import ErrorMessage from "components/ErrorMessage";
import Icon from "components/Icon";
import Input from "components/Input";
import Modal from "components/Modal";

import {
  SeparatorModel,
  StyledButton,
  StyledButtonWrapperModal,
  StyledContentModal,
  StyledInput,
  StyledTextModal,
  StyledWrapperForm,
} from "./Modals.styled";

export enum MemberCardVariant {
  Add = "add",
  Existing = "existing",
}

const StyledMemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 5px;
  width: 250px;
  height: 200px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

const StyledAddMemberCard = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 5px;
  width: 250px;
  height: 200px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: inherit;
  color: ${({ theme }) => theme.colors.font};

  &:hover {
    background-color: ${({ theme }) =>
      darken(0.05, theme.dotMenu.item.background)};
  }
`;

const StyledDotsHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
  width: 230px;
`;

const StyledDots = styled(Button)`
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 0px;
  height: 24px;
  width: 24px;
  border-radius: ${({ theme }) => theme.borderRadius}px;

  &:hover {
    background-color: ${({ theme }) =>
      darken(0.05, theme.dotMenu.item.background)};
  }
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const StyledName = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const StyledRole = styled.p`
  font-size: 16px;
  font-weight: 300;
`;

const ModalHolder = styled.div`
  width: 250px;
  height: 200px;
`;

interface MemberCardProps {
  variant?: MemberCardVariant;
  accountId?: number;
  name?: string;
  role?: string;
}

const MemberCard = ({
  variant,
  accountId,
  name,
  role,
}: MemberCardProps): JSX.Element => {
  const { inviteUser, kickMember } = useGroup();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLUListElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteUser>();

  const onSubmitInvite = (data: InviteUser) => {
    inviteUser(data);
  };

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.focus();
    }
  }, [isOpen]);

  const menu: MenuItem[] = [
    {
      icon: "EditPen",
      title: "Изменить роль",
      onClick: () => setIsOpen(!isOpen),
      children: (
        <Input label='Новое имя пользователь' placeholder='Введите имя' />
      ),
    },
    {
      icon: "Kick",
      title: "Выгнать",
      modalTitle: "Выгнать пользователя?",
      onClick: () => setIsOpen(!isOpen),
      children: (
        <StyledContentModal>
          <StyledTextModal>
            Этот пользователь больше не будет участником данной команды
          </StyledTextModal>
          <SeparatorModel />
          <StyledButtonWrapperModal>
            {accountId && (
              <StyledButton
                onClick={() => {
                  kickMember({ accountId });
                }}
              >
                Выгнать
              </StyledButton>
            )}
          </StyledButtonWrapperModal>
        </StyledContentModal>
      ),
    },
  ];

  if (variant === MemberCardVariant.Add) {
    return (
      <ModalHolder>
        <StyledAddMemberCard
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          <Icon type='AddPlus' />
          <StyledName>{name}</StyledName>
        </StyledAddMemberCard>
        {isModalOpen && (
          <Modal
            title='Пригласить пользователя'
            onClose={() => setIsModalOpen(false)}
          >
            <StyledWrapperForm onSubmit={handleSubmit(onSubmitInvite)}>
              <StyledInput
                type='email'
                placeholder='Email пользователя'
                {...register("email", {
                  required: true,
                  setValueAs: (v) => v.trim(),
                })}
                $isError={!!errors.email}
              />
              {errors.email && <ErrorMessage>Введите email</ErrorMessage>}
              <SeparatorModel />
              <StyledButtonWrapperModal>
                <StyledButton type='submit'>Пригласить</StyledButton>
              </StyledButtonWrapperModal>
            </StyledWrapperForm>
          </Modal>
        )}
      </ModalHolder>
    );
  }

  return (
    <StyledMemberCard>
      <StyledDotsHeader>
        <StyledDots onClick={() => setIsOpen(!isOpen)}>
          <Icon type='Dots' />
        </StyledDots>
        {isOpen && (
          <DotMenu
            ref={menuRef}
            items={menu}
            onClose={() => setIsOpen(false)}
          />
        )}
      </StyledDotsHeader>
      <Avatar size={96} />
      <StyledInfo>
        <StyledName>{name}</StyledName>
        <StyledRole>{role}</StyledRole>
      </StyledInfo>
    </StyledMemberCard>
  );
};

export default MemberCard;
